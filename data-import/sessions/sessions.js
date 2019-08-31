const faker = require('faker');

const subjectNames = [
    'Programming Fundamentals', 
    'Applications Programming', 
    'Datastructures & Algorithms', 
    'Fundamentals of C', 
    'Design & Innovation', 
    'Engineering Communication', 
    'Software Engineering Studio 2A', 
    'Database Fundamentals', 
    'Space Studio', 
    'Mathematical Modelling 2'
];

function generateFakeSession(randomSubjectName) {
    let randomDate = faker.date.recent();
    let formattedDate = randomDate.getDate() + '-' + (randomDate.getMonth() + 1) + '-' + randomDate.getFullYear()
    let randomStartTime = '10:00';
    let randomEndTime = '12:00';
    
    const n = (faker.random.number({ min:100, max: 999}) + '').split('');
    let randomRoom = `CB0${n[0]}.${n[1]}.${n[2]}`;

    let randomAdvisorName = faker.name.findName();
    let randomType = 'Random';
    let randomStudentId = faker.random.number({min: 10000000, max: 99999999});
    let randomReason = faker.lorem.sentence();
    let randomAssignmentType = faker.lorem.sentence();
    let randomIsGroupAssignment = faker.random.boolean();
    let randomOptions = {};
    for (let i = 0; i < 7; i++) {
        randomOptions[`bookingAnswer${i}`] = faker.random.boolean();
    }
    let randomWaitingList = [];

    return {
        date: formattedDate,
        startTime: randomStartTime,
        endTime: randomEndTime,
        room: randomRoom,
        advisor: randomAdvisorName,
        type: randomType,
        currentBooking: {
            studentId: randomStudentId,
            reason: randomReason,
            subjectName: randomSubjectName,
            assignmentType: randomAssignmentType,
            isGroupAssignment: randomIsGroupAssignment,
            additionalHelpDetails: '',
            needsHelpWithOptions: randomOptions
        },
        waitingList: randomWaitingList
    }
}

module.exports = subjectNames.map((subjectName) => {
        let user = generateFakeSession(subjectName);
        return user;
    });

