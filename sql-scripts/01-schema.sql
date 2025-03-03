\c mydatabase;

CREATE TABLE IF NOT EXISTS users (
    userId SERIAL PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255),
    firstName VARCHAR(100),
    lastName VARCHAR(100),
    managerId INT NULL,
    individualContributor BOOLEAN NOT NULL DEFAULT TRUE, 
    role VARCHAR(20) CHECK (role IN ('Software Engineer', 'Test Engineer')),
    CONSTRAINT fk_manager FOREIGN KEY (managerId) REFERENCES users(userId) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS assessment (
    assessmentId SERIAL PRIMARY KEY,
    userId INT NOT NULL,
    level VARCHAR(20) CHECK (level IN ('Intermediate', 'Senior', 'Principal')),
    status VARCHAR(50) NOT NULL DEFAULT 'In Progress',
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    assessmentAnswers JSONB NULL,
    CONSTRAINT fk_assessment_user FOREIGN KEY (userId) REFERENCES users(userId) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS question (
    questionId SERIAL PRIMARY KEY,
    role VARCHAR(100) NOT NULL,
    level VARCHAR(100) NOT NULL,
    category VARCHAR(100) NOT NULL,
    relatedPEOCapabilities VARCHAR(250),
    relatedPEOBehaviours VARCHAR(250),
    questionText TEXT NOT NULL,
    CONSTRAINT unique_question_entry UNIQUE (role, level, category, questionText)
);

CREATE TABLE IF NOT EXISTS comment (
    commentId SERIAL PRIMARY KEY,
    questionId INT NOT NULL,
    assessmentId INT NOT NULL,
    userId INT NOT NULL,
    commentText TEXT NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    CONSTRAINT fk_comments_question FOREIGN KEY (questionId) REFERENCES question(questionId) ON DELETE CASCADE,
    CONSTRAINT fk_comments_evaluation FOREIGN KEY (assessmentId) REFERENCES assessment(assessmentId) ON DELETE CASCADE,
    CONSTRAINT fk_comments_user FOREIGN KEY (userId) REFERENCES users(userId) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS images (
    imageId SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    data BYTEA NOT NULL,
    mimetype TEXT NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS peerFeedback (
    id SERIAL PRIMARY KEY,
    assessmentId INT NOT NULL,
    imageId INT,
    CONSTRAINT fk_peerFeedback_assessment FOREIGN KEY (assessmentId) REFERENCES assessment(assessmentId) ON DELETE CASCADE,
    CONSTRAINT fk_peerFeedback_images FOREIGN KEY (imageId) REFERENCES images(imageId) ON DELETE CASCADE
);