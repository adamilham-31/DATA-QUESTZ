const questions = [

    // ==========================================
    // MISSION 1 — Age > 20
    // ==========================================

    {
        sql: `
            SELECT *
            FROM Students
            WHERE Age > 20
        `,

        lesson: `
            The WHERE clause filters records.

            In this mission, the database only keeps
            students whose Age is greater than 20.
        `,

        hint: `
            Check the student's Age.

            Only students older than 20 should enter DATABASE.
        `,

        dataset: [
            { name: "Alice", age: 21, passed: true, gpa: 3.8 },
            { name: "Bob", age: 19, passed: true, gpa: 3.2 },
            { name: "Carol", age: 24, passed: false, gpa: 3.9 },
            { name: "David", age: 25, passed: true, gpa: 3.6 },
            { name: "Emma", age: 18, passed: false, gpa: 2.8 },
            { name: "Frank", age: 22, passed: true, gpa: 3.7 }
        ],

        answer: {
            logic: "AND",
            conditions: [
                {
                    field: "age",
                    operator: ">",
                    value: 20
                }
            ]
        },

        explanation: `
            The query checks:

            Age > 20

            A student belongs in DATABASE when
            their Age is greater than 20.
        `
    },


    // ==========================================
    // MISSION 2 — Passed = TRUE
    // ==========================================

    {
        sql: `
            SELECT *
            FROM Students
            WHERE Passed = TRUE
        `,

        lesson: `
            Boolean values have two states:

            TRUE  = condition satisfied
            FALSE = condition not satisfied

            SQL can filter records using TRUE/FALSE values.
        `,

        hint: `
            Look at the Passed value.

            Only students with Passed = TRUE belong in DATABASE.
        `,

        dataset: [
            { name: "Alice", age: 21, passed: true, gpa: 3.8 },
            { name: "Bob", age: 19, passed: true, gpa: 3.2 },
            { name: "Carol", age: 24, passed: false, gpa: 3.9 },
            { name: "David", age: 25, passed: true, gpa: 3.6 },
            { name: "Emma", age: 18, passed: false, gpa: 2.8 },
            { name: "Frank", age: 22, passed: true, gpa: 3.7 }
        ],

        answer: {
            logic: "AND",
            conditions: [
                {
                    field: "passed",
                    operator: "===",
                    value: true
                }
            ]
        },

        explanation: `
            The query checks:

            Passed = TRUE

            A student belongs in DATABASE when
            their Passed value is TRUE.
        `
    },


    // ==========================================
    // MISSION 3 — Age > 20 AND Passed = TRUE
    // ==========================================

    {
        sql: `
            SELECT *
            FROM Students
            WHERE Age > 20
            AND Passed = TRUE
        `,

        lesson: `
            AND means ALL conditions must be true.

            A record must have:

            1. Age greater than 20
            2. Passed equal to TRUE

            Both are required.
        `,

        hint: `
            Check both Age and Passed.

            One correct condition is not enough.
        `,

        dataset: [
            { name: "Alice", age: 21, passed: true, gpa: 3.8 },
            { name: "Bob", age: 19, passed: true, gpa: 3.2 },
            { name: "Carol", age: 24, passed: false, gpa: 3.9 },
            { name: "David", age: 25, passed: true, gpa: 3.6 },
            { name: "Emma", age: 18, passed: false, gpa: 2.8 },
            { name: "Frank", age: 22, passed: true, gpa: 3.7 }
        ],

        answer: {
            logic: "AND",
            conditions: [
                {
                    field: "age",
                    operator: ">",
                    value: 20
                },
                {
                    field: "passed",
                    operator: "===",
                    value: true
                }
            ]
        },

        explanation: `
            The query requires BOTH conditions:

            Age > 20

            AND

            Passed = TRUE

            Both conditions must be satisfied.
        `
    },


    // ==========================================
    // MISSION 4 — GPA > 3.5
    // ==========================================

    {
        sql: `
            SELECT *
            FROM Students
            WHERE GPA > 3.5
        `,

        lesson: `
            SQL can compare numbers.

            GPA > 3.5 means:

            Only students with GPA higher than 3.5
            will appear in the result.
        `,

        hint: `
            Compare the student's GPA.

            Is it greater than 3.5?
        `,

        dataset: [
            { name: "Alice", age: 21, passed: true, gpa: 3.8 },
            { name: "Bob", age: 19, passed: true, gpa: 3.2 },
            { name: "Carol", age: 24, passed: false, gpa: 3.9 },
            { name: "David", age: 25, passed: true, gpa: 3.6 },
            { name: "Emma", age: 18, passed: false, gpa: 2.8 },
            { name: "Frank", age: 22, passed: true, gpa: 3.7 }
        ],

        answer: {
            logic: "AND",
            conditions: [
                {
                    field: "gpa",
                    operator: ">",
                    value: 3.5
                }
            ]
        },

        explanation: `
            The query checks:

            GPA > 3.5

            A student belongs in DATABASE when
            their GPA is greater than 3.5.
        `
    },

    // ==========================================
    // MISSION 5 — GPA < 3.0
    // ==========================================

    {
        sql: `
            SELECT *
            FROM Students
            WHERE GPA < 3.0
        `,

        lesson: `
            The < operator means "Less Than".

            In this mission, we want to find students
            who have a GPA lower than 3.0.
        `,

        hint: `
            Look at the student's GPA.

            Only a GPA strictly less than 3.0 should enter the DATABASE.
        `,

        dataset: [
            { name: "Alice", age: 21, passed: true, gpa: 3.8 },
            { name: "Bob", age: 19, passed: true, gpa: 3.2 },
            { name: "Carol", age: 24, passed: false, gpa: 3.9 },
            { name: "David", age: 25, passed: true, gpa: 3.6 },
            { name: "Emma", age: 18, passed: false, gpa: 2.8 },
            { name: "Frank", age: 22, passed: true, gpa: 3.7 }
        ],

        answer: {
            logic: "AND",
            conditions: [
                {
                    field: "gpa",
                    operator: "<",
                    value: 3.0
                }
            ]
        },

        explanation: `
            The query checks:

            GPA < 3.0

            A student belongs in DATABASE when
            their GPA is lower than 3.0.
        `
    },

    // ==========================================
    // MISSION 6 — Age <= 20
    // ==========================================

    {
        sql: `
            SELECT *
            FROM Students
            WHERE Age <= 20
        `,

        lesson: `
            The <= operator means "Less Than or Equal To".

            This includes students who are exactly 20, 
            as well as anyone younger than 20.
        `,

        hint: `
            Check the student's Age.

            Are they 20 or younger?
        `,

        dataset: [
            { name: "Alice", age: 21, passed: true, gpa: 3.8 },
            { name: "Bob", age: 19, passed: true, gpa: 3.2 },
            { name: "Carol", age: 24, passed: false, gpa: 3.9 },
            { name: "David", age: 25, passed: true, gpa: 3.6 },
            { name: "Emma", age: 18, passed: false, gpa: 2.8 },
            { name: "Frank", age: 22, passed: true, gpa: 3.7 }
        ],

        answer: {
            logic: "AND",
            conditions: [
                {
                    field: "age",
                    operator: "<=",
                    value: 20
                }
            ]
        },

        explanation: `
            The query checks:

            Age <= 20

            A student belongs in DATABASE if they 
            are 20 years old or younger.
        `
    },

    // ==========================================
    // MISSION 7 — Passed = FALSE
    // ==========================================

    {
        sql: `
            SELECT *
            FROM Students
            WHERE Passed = FALSE
        `,

        lesson: `
            We can also filter by FALSE.

            This query will look for records where the 
            Passed condition was not met.
        `,

        hint: `
            Look for students who did not pass.

            Their Passed value must be FALSE.
        `,

        dataset: [
            { name: "Alice", age: 21, passed: true, gpa: 3.8 },
            { name: "Bob", age: 19, passed: true, gpa: 3.2 },
            { name: "Carol", age: 24, passed: false, gpa: 3.9 },
            { name: "David", age: 25, passed: true, gpa: 3.6 },
            { name: "Emma", age: 18, passed: false, gpa: 2.8 },
            { name: "Frank", age: 22, passed: true, gpa: 3.7 }
        ],

        answer: {
            logic: "AND",
            conditions: [
                {
                    field: "passed",
                    operator: "===",
                    value: false
                }
            ]
        },

        explanation: `
            The query checks:

            Passed = FALSE

            Only students whose Passed value is FALSE 
            should enter the DATABASE.
        `
    },

    // ==========================================
    // MISSION 8 — Age >= 24
    // ==========================================

    {
        sql: `
            SELECT *
            FROM Students
            WHERE Age >= 24
        `,

        lesson: `
            The >= operator means "Greater Than or Equal To".

            This includes students who are exactly 24, 
            and anyone older than 24.
        `,

        hint: `
            Check if the student's Age is 24 or more.
        `,

        dataset: [
            { name: "Alice", age: 21, passed: true, gpa: 3.8 },
            { name: "Bob", age: 19, passed: true, gpa: 3.2 },
            { name: "Carol", age: 24, passed: false, gpa: 3.9 },
            { name: "David", age: 25, passed: true, gpa: 3.6 },
            { name: "Emma", age: 18, passed: false, gpa: 2.8 },
            { name: "Frank", age: 22, passed: true, gpa: 3.7 }
        ],

        answer: {
            logic: "AND",
            conditions: [
                {
                    field: "age",
                    operator: ">=",
                    value: 24
                }
            ]
        },

        explanation: `
            The query checks:

            Age >= 24

            A student belongs in DATABASE if they 
            are 24 years old or older.
        `
    },

    // ==========================================
    // MISSION 9 — Age < 22 AND Passed = TRUE
    // ==========================================

    {
        sql: `
            SELECT *
            FROM Students
            WHERE Age < 22
            AND Passed = TRUE
        `,

        lesson: `
            Let's combine concepts using AND!

            1. Age is strictly less than 22
            2. Passed is TRUE

            Remember, BOTH must be true.
        `,

        hint: `
            First, ensure they are younger than 22.
            Then, ensure they have Passed = TRUE.
        `,

        dataset: [
            { name: "Alice", age: 21, passed: true, gpa: 3.8 },
            { name: "Bob", age: 19, passed: true, gpa: 3.2 },
            { name: "Carol", age: 24, passed: false, gpa: 3.9 },
            { name: "David", age: 25, passed: true, gpa: 3.6 },
            { name: "Emma", age: 18, passed: false, gpa: 2.8 },
            { name: "Frank", age: 22, passed: true, gpa: 3.7 }
        ],

        answer: {
            logic: "AND",
            conditions: [
                {
                    field: "age",
                    operator: "<",
                    value: 22
                },
                {
                    field: "passed",
                    operator: "===",
                    value: true
                }
            ]
        },

        explanation: `
            The query requires BOTH conditions:

            Age < 22 
            AND 
            Passed = TRUE
        `
    },

    // ==========================================
    // MISSION 10 — GPA >= 3.8
    // ==========================================

    {
        sql: `
            SELECT *
            FROM Students
            WHERE GPA >= 3.8
        `,

        lesson: `
            Decimals can also be compared using >=.

            This will find our top-performing students 
            with a GPA of 3.8 or higher.
        `,

        hint: `
            Check the student's GPA. Is it 3.8 or above?
        `,

        dataset: [
            { name: "Alice", age: 21, passed: true, gpa: 3.8 },
            { name: "Bob", age: 19, passed: true, gpa: 3.2 },
            { name: "Carol", age: 24, passed: false, gpa: 3.9 },
            { name: "David", age: 25, passed: true, gpa: 3.6 },
            { name: "Emma", age: 18, passed: false, gpa: 2.8 },
            { name: "Frank", age: 22, passed: true, gpa: 3.7 }
        ],

        answer: {
            logic: "AND",
            conditions: [
                {
                    field: "gpa",
                    operator: ">=",
                    value: 3.8
                }
            ]
        },

        explanation: `
            The query checks:

            GPA >= 3.8

            Only students with 3.8 or higher enter the DATABASE.
        `
    },

    // ==========================================
    // MISSION 11 — Age = 18
    // ==========================================

    {
        sql: `
            SELECT *
            FROM Students
            WHERE Age = 18
        `,

        lesson: `
            In SQL, a single = sign tests for an exact match.

            This query looks for students who are 
            exactly 18 years old.
        `,

        hint: `
            Look for the exact Age of 18.
        `,

        dataset: [
            { name: "Alice", age: 21, passed: true, gpa: 3.8 },
            { name: "Bob", age: 19, passed: true, gpa: 3.2 },
            { name: "Carol", age: 24, passed: false, gpa: 3.9 },
            { name: "David", age: 25, passed: true, gpa: 3.6 },
            { name: "Emma", age: 18, passed: false, gpa: 2.8 },
            { name: "Frank", age: 22, passed: true, gpa: 3.7 }
        ],

        answer: {
            logic: "AND",
            conditions: [
                {
                    field: "age",
                    operator: "===",
                    value: 18
                }
            ]
        },

        explanation: `
            The query checks:

            Age = 18

            The student must be exactly 18 to enter DATABASE.
        `
    },

    // ==========================================
    // MISSION 12 — GPA > 3.5 AND Age > 20
    // ==========================================

    {
        sql: `
            SELECT *
            FROM Students
            WHERE GPA > 3.5
            AND Age > 20
        `,

        lesson: `
            You can combine multiple number comparisons!

            1. GPA must be greater than 3.5
            2. Age must be greater than 20
        `,

        hint: `
            Check both GPA and Age. Both need to be greater 
            than their target numbers.
        `,

        dataset: [
            { name: "Alice", age: 21, passed: true, gpa: 3.8 },
            { name: "Bob", age: 19, passed: true, gpa: 3.2 },
            { name: "Carol", age: 24, passed: false, gpa: 3.9 },
            { name: "David", age: 25, passed: true, gpa: 3.6 },
            { name: "Emma", age: 18, passed: false, gpa: 2.8 },
            { name: "Frank", age: 22, passed: true, gpa: 3.7 }
        ],

        answer: {
            logic: "AND",
            conditions: [
                {
                    field: "gpa",
                    operator: ">",
                    value: 3.5
                },
                {
                    field: "age",
                    operator: ">",
                    value: 20
                }
            ]
        },

        explanation: `
            The query requires BOTH conditions:

            GPA > 3.5 AND Age > 20
        `
    },

    // ==========================================
    // MISSION 13 — GPA > 3.0 AND Passed = FALSE
    // ==========================================

    {
        sql: `
            SELECT *
            FROM Students
            WHERE GPA > 3.0
            AND Passed = FALSE
        `,

        lesson: `
            Sometimes we want to find anomalies in data.

            This queries finds students who have a decent GPA 
            but somehow still failed (Passed = FALSE).
        `,

        hint: `
            Check that GPA is greater than 3.0.
            Then check that Passed is FALSE.
        `,

        dataset: [
            { name: "Alice", age: 21, passed: true, gpa: 3.8 },
            { name: "Bob", age: 19, passed: true, gpa: 3.2 },
            { name: "Carol", age: 24, passed: false, gpa: 3.9 },
            { name: "David", age: 25, passed: true, gpa: 3.6 },
            { name: "Emma", age: 18, passed: false, gpa: 2.8 },
            { name: "Frank", age: 22, passed: true, gpa: 3.7 }
        ],

        answer: {
            logic: "AND",
            conditions: [
                {
                    field: "gpa",
                    operator: ">",
                    value: 3.0
                },
                {
                    field: "passed",
                    operator: "===",
                    value: false
                }
            ]
        },

        explanation: `
            The query requires BOTH conditions:

            GPA > 3.0 AND Passed = FALSE
        `
    },

    // ==========================================
    // MISSION 14 — Age <= 22 AND Passed = FALSE
    // ==========================================

    {
        sql: `
            SELECT *
            FROM Students
            WHERE Age <= 22
            AND Passed = FALSE
        `,

        lesson: `
            Combining <= with a boolean check.

            We are looking for younger students (22 or under) 
            who did not pass.
        `,

        hint: `
            Ensure Age is 22 or less.
            Ensure Passed is exactly FALSE.
        `,

        dataset: [
            { name: "Alice", age: 21, passed: true, gpa: 3.8 },
            { name: "Bob", age: 19, passed: true, gpa: 3.2 },
            { name: "Carol", age: 24, passed: false, gpa: 3.9 },
            { name: "David", age: 25, passed: true, gpa: 3.6 },
            { name: "Emma", age: 18, passed: false, gpa: 2.8 },
            { name: "Frank", age: 22, passed: true, gpa: 3.7 }
        ],

        answer: {
            logic: "AND",
            conditions: [
                {
                    field: "age",
                    operator: "<=",
                    value: 22
                },
                {
                    field: "passed",
                    operator: "===",
                    value: false
                }
            ]
        },

        explanation: `
            The query requires BOTH conditions:

            Age <= 22 AND Passed = FALSE
        `
    },

    // ==========================================
    // MISSION 15 — GPA <= 3.2
    // ==========================================

    {
        sql: `
            SELECT *
            FROM Students
            WHERE GPA <= 3.2
        `,

        lesson: `
            One last check for <= on a decimal!

            This captures any student whose GPA is exactly 3.2 
            or anything lower than that.
        `,

        hint: `
            Find students with a GPA of 3.2 or lower.
        `,

        dataset: [
            { name: "Alice", age: 21, passed: true, gpa: 3.8 },
            { name: "Bob", age: 19, passed: true, gpa: 3.2 },
            { name: "Carol", age: 24, passed: false, gpa: 3.9 },
            { name: "David", age: 25, passed: true, gpa: 3.6 },
            { name: "Emma", age: 18, passed: false, gpa: 2.8 },
            { name: "Frank", age: 22, passed: true, gpa: 3.7 }
        ],

        answer: {
            logic: "AND",
            conditions: [
                {
                    field: "gpa",
                    operator: "<=",
                    value: 3.2
                }
            ]
        },

        explanation: `
            The query checks:

            GPA <= 3.2

            A student belongs in DATABASE if their 
            GPA is 3.2 or less.
        `
    }
];