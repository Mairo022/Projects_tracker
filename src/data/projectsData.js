export const projectsData = new Map([
    [0, driveclubSiteInfo],
    [1, jobsInfo],
    [2, projectsInfo]
])

const projectsInfo = {
    todo: [
        {
            id: 0,
            title: "Add new project functionality",
            created: new Date('2024-03-06T11:22:00')
        },
        {
            id: 1,
            title: "Add new task/bug/idea functionality",
            created: new Date('2024-03-06T11:22:00')
        },
        {
            id: 2,
            title: "Display tasks/bugs/ideas/history",
            created: new Date('2024-03-05T18:22:00')
        }
    ],
    bugs: [
        {}
    ],
    ideas: [
        {}
    ],
    history: [
        {
            id: 3,
            title: "Add menu",
            created: new Date('2024-03-01T11:22:00'),
            completed: new Date('2024-03-01T16:22:00')
        },
        {
            id: 4,
            title: "Add content area",
            created: new Date('2024-03-01T11:22:00'),
            completed: new Date('2024-03-01T19:22:00')
        },
        {
            id: 5,
            title: "Replace css files with tailwind",
            created: new Date('2024-02-27T22:22:00'),
            completed: new Date('2024-02-28T18:22:00')
        }
    ]
}

const jobsInfo = {
    todo: [
        {

        }
    ],
    bugs: [
        {

        }
    ],
    ideas: [
        {

        }
    ],
    history: [
        {

        }
    ]
}

const driveclubSiteInfo = {
    todo: [
        {
            id: 6,
            title: "Find good font (currently using 3 fonts)",
            created: new Date('2024-03-06T11:22:00')
        },
        {
            id: 7,
            title: "Fix car names",
            created: new Date('2024-03-05T17:22:00')
        },
        {
            id: 8,
            title: "Wrap table rows with links in anchor element",
            created: new Date('2024-02-28T17:22:00')
        },
    ],
    bugs: [
        {}
    ],
    ideas: [
        {
            id: 9,
            title: "Add bigint support for request data without dependency",
            created: new Date('2024-01-20T17:22:00')
        },
        {
            id: 10,
            title: "Change theme and layout",
            created: new Date('2024-01-21T17:22:00')
        }
    ]
    history: [
        {
            id: 11,
            title: "Fix pagination pages calculation",
            created: new Date('2024-01-28T17:22:00'),
            completed: new Date('2024-01-28T18:22:00')
        },
        {
            id: 12,
            title: "Fix pagination of Drivers & Sessions",
            created: new Date('2024-01-25T17:22:00'),
            completed: new Date('2024-01-26T19:22:00')
        },
        {
            id: 13,
            title: "Make request params builder generic",
            created: new Date('2024-01-26T17:22:00'),
            completed: new Date('2024-01-26T18:22:00')
        }
    ]
}