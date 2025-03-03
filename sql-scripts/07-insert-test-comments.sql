\c mydatabase;

INSERT INTO comment (questionId, assessmentId, userId, commentText, date) VALUES
(41, 1, 4, 'Led the investigation of what was causing the production QM defects and customer complaints where the numerator/denominator value was not matching the number of triggering assessments.', '2025-02-26 23:52:32.442'),
(43, 1, 4, 'Participated in a handful of emergency production deployments with changes that were needed in order to not break SLA. In deployments that I am a part of, I take before and after screenshots of the health of the app in the Grafana dashboard. 

In the deployment of the QM defect fix, I created a metric to determine the scope of the problem in the Prod DB beforehand, and compared that to the scope of the problem after deployment to determine that the fix indeed solved some of the problems, and by what extent.', '2025-02-26 23:55:33.636'),
(44, 1, 4, 'Taking the lead on ensuring all QM and QRP measures are covered by automation tests, and will be taking a lead on ensuring all QM workflow scenarios are covered by automation tests.', '2025-02-26 23:56:48.969'),
(49, 1, 4, 'In order to solve customer-raised QM defects within a week, I debugged stored procedures to determine where the problem was occurring and how to solve it in a timely manner. Tickets were created after the temporary resolution to identify the root cause.', '2025-02-26 23:58:46.980'),
(57, 1, 4, 'My estimates are usually very similar to those of my team members in refinement meetings, and I considered unit tests, integration tests, the time required to collaborate or communicate with different teams on the issues, design time, and more.', '2025-02-27 00:01:11.674'),
(58, 1, 4, 'Besides Pawandeep and Tri, I feel that I have strong knowledge on QM and how it works.', '2025-02-27 00:02:12.851'),
(59, 1, 4, 'I have created many Confluence pages and presented those pages in KTs with new members and peers (Christiana, Justin, interns) on the stored procedures and ETL flow of QM.', '2025-02-27 00:03:21.023'),
(63, 1, 4, 'With WQIP, especially when it came to figuring out the 60-day logic, I was vocal in refinement meetings to express what I think the requirements of the tickets were.', '2025-02-27 00:05:28.554'),
(65, 1, 4, 'With the logic around modified and accepted assessments in both WQIP and QM, I felt that I had a very strong understanding of the workflow from a product standpoint, and was able to contribute my opinions on it and guide discussion around implementation without needing product to explain the workflow.', '2025-02-27 00:06:35.868'),
(75, 1, 4, 'I am in the process of completing the Pluralsight "Hack Yourself" course on security for developers.', '2025-02-27 00:07:51.715'),
(76, 1, 4, 'With QMs, I felt that there were missing production monitoring metrics that could have helped detect issues sooner, so I created the query to be added as an alert.', '2025-02-27 00:09:48.529'),
(79, 1, 4, 'When doing production monitoring, I noticed that there are some non-SLA pipelines that fail regularly, so I created tickets for teams on Insights to pick up when they have bandwidth to resolve those issues identified.', '2025-02-27 00:11:55.900');