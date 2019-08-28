const faker = require('faker');

const names = ['John', 'Joanne', 'Bob', 'Will', 'Chris', 'Mike', 'Anna', 'Jack', 'Peter', 'Paul'];

function generateFakeStudent() {
    let randomEmail= faker.internet.email();
    let randomStudentId = faker.random.number({min: 10000000, max: 99999999})
    let randomFullName = faker.name.findName();
    let randomPreferredName = randomFullName.split(' ')[0];
    let randomFaculty = 'Engineering';
    let randomCourseId = faker.random.alphaNumeric(8);
    let randomPreferredContactNumber = faker.phone.phoneNumber();
    let randomDateOfBirth = faker.lorem.sentence();
    let randomGender = faker.random.boolean() ? 'male' : 'female';
    let randomDegree = faker.lorem.sentence();
    let randomStatus = faker.random.boolean();
    let randomUpcomingSessions = {
        sessionIds: [],
        workshopSessionIds: []
    };
    let randomPreviousSessions = {
        sessionIds: [],
        workshopSessionIds: []
    }
    let randomEducation = [];
    const courseTitles = ['hsc', 'ielts', 'toefl', 'tafe', 'cult', 'insearchDeep', 'insearchDiploma', 'foundationCourse'] ;
    for (title in courseTitles) {
        randomEducation.push({
            title: courseTitles[title],
            mark: faker.random.number({ 'min': 0, 'max': 100}),
            isChecked: faker.random.boolean()
        })
    }

    return {
       email: randomEmail,
       studentId: randomStudentId,
       fullName: randomFullName,
       preferredName: randomPreferredName,
       faculty: randomFaculty,
       courseId: randomCourseId,
       preferredContactNumber: randomPreferredContactNumber,
       dateOfBirth: randomDateOfBirth,
       gender: randomGender,
       degree: randomDegree,
       status: randomStatus,
       upcomingSessions: randomUpcomingSessions,
       previousSessions: randomPreviousSessions,
       education: randomEducation
    }
}

module.exports = names.map(name => {
        let user = generateFakeStudent();
        return user;
    });