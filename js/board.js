let title;
let description;
let state;

let category = [{
    'name': 'design',
    'color': '#FF7A00'
}];


let contacts = [{
    'name': 'Simon Meyer',
    'color': '#0190E0',
    'email': 'simon.meyer@gmail.com',
    'phone': '+49 0123 456 78 9'
},{
    'name': 'Maximilian Vogel',
    'color': '#EE00D6',
    'email': 'maximilian.vogel@gmail.com',
    'phone': '+49 0123 456 78 9'
},{
    'name': 'Eva Fischer',
    'color': '#02CF2F',
    'email': 'Eva.Fischer@gmail.com',
    'phone': '+49 0123 456 78 9'
}];


let task = [{
    'category': [],
    'title': 'Website redesign',
    'description': "Modify the contents of the main website. Adjust the UI to the company's brand design.",
    'process': '0/2',
    'team': [],
    'prior': 'assets/img/green.png',
    'board': 0
}]

let todo = [
    {
        'category': [{'name': 'design','color': '#FF7A00'}],
        'title': 'Website redesign',
        'description': "Modify the contents of the main website. Adjust the UI to the company's brand design.",
        'process': '0/2',
        'team': [
            {
                'name': 'Simon Meyer',
                'color': '#0190E0',
                'email': 'simon.meyer@gmail.com',
                'phone': '+49 0123 456 78 9'
            },{
                'name': 'Maximilian Vogel',
                'color': '#EE00D6',
                'email': 'maximilian.vogel@gmail.com',
                'phone': '+49 0123 456 78 9'
            },{
                'name': 'Eva Fischer',
                'color': '#02CF2F',
                'email': 'Eva.Fischer@gmail.com',
                'phone': '+49 0123 456 78 9'
            }
        ],
        'prior': 'assets/img/green.png',
        'board': 0
    }
]

let progress = []

let feedback = []

let done = []