\c mydatabase;

UPDATE users
SET managerid = CASE 
    WHEN email = 'maciek.sliwa@pointclickcare.com' THEN 1
    WHEN email = 'adam.sandler@pointclickcare.com' THEN 1
    WHEN email = 'raka.dhar@pointclickcare.com' THEN 2
    WHEN email = 'paul.mall@pointclickcare.com' THEN 2
    WHEN email = 'julia.groza@pointclickcare.com' THEN 3
    WHEN email = 'april.song@pointclickcare.com' THEN 3
    WHEN email = 'disha.kaur@pointclickcare.com' THEN 4
    WHEN email = 'matthew.babar@pointclickcare.com' THEN 4
    WHEN email = 'sav.bear@pointclickcare.com' THEN 5
    WHEN email = 'chloe.chan@pointclickcare.com' THEN 5
    ELSE managerid
END
WHERE email IN (
    'maciek.sliwa@pointclickcare.com', 'adam.sandler@pointclickcare.com',
    'raka.dhar@pointclickcare.com', 'paul.mall@pointclickcare.com',
    'julia.groza@pointclickcare.com', 'april.song@pointclickcare.com',
    'disha.kaur@pointclickcare.com', 'matthew.babar@pointclickcare.com',
    'sav.bear@pointclickcare.com', 'chloe.chan@pointclickcare.com'
);