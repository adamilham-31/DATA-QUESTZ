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
            {
                name: "Alice",
                age: 21,
                passed: true,
                gpa: 3.8
            },
            {
                name: "Bob",
                age: 19,
                passed: true,
                gpa: 3.2
            },
            {
                name: "Carol",
                age: 24,
                passed: false,
                gpa: 3.9
            },
            {
                name: "David",
                age: 25,
                passed: true,
                gpa: 3.6
            },
            {
                name: "Emma",
                age: 18,
                passed: false,
                gpa: 2.8
            },
            {
                name: "Frank",
                age: 22,
                passed: true,
                gpa: 3.7
            }
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
            {
                name: "Alice",
                age: 21,
                passed: true,
                gpa: 3.8
            },
            {
                name: "Bob",
                age: 19,
                passed: true,
                gpa: 3.2
            },
            {
                name: "Carol",
                age: 24,
                passed: false,
                gpa: 3.9
            },
            {
                name: "David",
                age: 25,
                passed: true,
                gpa: 3.6
            },
            {
                name: "Emma",
                age: 18,
                passed: false,
                gpa: 2.8
            },
            {
                name: "Frank",
                age: 22,
                passed: true,
                gpa: 3.7
            }
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
            {
                name: "Alice",
                age: 21,
                passed: true,
                gpa: 3.8
            },
            {
                name: "Bob",
                age: 19,
                passed: true,
                gpa: 3.2
            },
            {
                name: "Carol",
                age: 24,
                passed: false,
                gpa: 3.9
            },
            {
                name: "David",
                age: 25,
                passed: true,
                gpa: 3.6
            },
            {
                name: "Emma",
                age: 18,
                passed: false,
                gpa: 2.8
            },
            {
                name: "Frank",
                age: 22,
                passed: true,
                gpa: 3.7
            }
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
            {
                name: "Alice",
                age: 21,
                passed: true,
                gpa: 3.8
            },
            {
                name: "Bob",
                age: 19,
                passed: true,
                gpa: 3.2
            },
            {
                name: "Carol",
                age: 24,
                passed: false,
                gpa: 3.9
            },
            {
                name: "David",
                age: 25,
                passed: true,
                gpa: 3.6
            },
            {
                name: "Emma",
                age: 18,
                passed: false,
                gpa: 2.8
            },
            {
                name: "Frank",
                age: 22,
                passed: true,
                gpa: 3.7
            }
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
    }

];