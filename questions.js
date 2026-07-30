const questions = [

{
    sql:
    `
    SELECT *
    FROM Students
    WHERE Age > 20
    `,

    lesson:
    `
    The WHERE clause filters records.

    In this mission, the database only keeps
    students whose Age is greater than 20.
    `,

    hint:
    `
    Check the student's Age.

    Only students older than 20 should enter DATABASE.
    `,

    explanation:
    (student)=>
    `
    ${student.name} has Age ${student.age}.

    Condition:
    Age > 20

    ${student.age} > 20

    ${
        student.age > 20
        ? "TRUE ✅"
        : "FALSE ❌"
    }

    ${
        student.age > 20
        ? "This record matches the SQL query."
        : "This record does not match the SQL query."
    }
    `,

    check:(student)=>

    student.age > 20

},



{

    sql:
    `
    SELECT *
    FROM Students
    WHERE Passed = TRUE
    `,


    lesson:
    `
    Boolean values have two states:

    TRUE  = condition satisfied
    FALSE = condition not satisfied

    SQL can filter records using TRUE/FALSE values.
    `,


    hint:
    `
    Look at the Passed value.

    Only students with Passed = TRUE belong in DATABASE.
    `,


    explanation:
    (student)=>
    `
    ${student.name}:

    Passed value:
    ${student.passed}

    SQL requires:

    Passed = TRUE

    ${
        student.passed
        ? "TRUE ✅ This record matches."
        : "FALSE ❌ This record is rejected."
    }
    `,


    check:(student)=>

    student.passed

},



{

    sql:
    `
    SELECT *
    FROM Students
    WHERE Age > 20
    AND Passed = TRUE
    `,


    lesson:
    `
    AND means ALL conditions must be true.

    A record must have:

    1. Age greater than 20
    2. Passed equal to TRUE

    Both are required.
    `,


    hint:
    `
    Check both Age and Passed.

    One correct condition is not enough.
    `,


    explanation:
    (student)=>
    `

    ${student.name}

    Age:
    ${student.age}

    Passed:
    ${student.passed}


    Age > 20:
    ${
        student.age > 20
        ? "TRUE ✅"
        : "FALSE ❌"
    }


    Passed = TRUE:
    ${
        student.passed
        ? "TRUE ✅"
        : "FALSE ❌"
    }


    ${
        student.age > 20 && student.passed
        ? "Both conditions are satisfied."
        : "The AND condition failed."
    }

    `,


    check:(student)=>

    student.age > 20 && student.passed

},



{

    sql:
    `
    SELECT *
    FROM Students
    WHERE GPA > 3.5
    `,


    lesson:
    `
    SQL can compare numbers.

    GPA > 3.5 means:

    Only students with GPA higher than 3.5
    will appear in the result.
    `,


    hint:
    `
    Compare the student's GPA.

    Is it greater than 3.5?
    `,


    explanation:
    (student)=>
    `

    ${student.name}

    GPA:
    ${student.gpa}


    Condition:

    GPA > 3.5


    ${
        student.gpa > 3.5
        ? "TRUE ✅ Record selected."
        : "FALSE ❌ Record rejected."
    }

    `,


    check:(student)=>

    student.gpa > 3.5

}


];