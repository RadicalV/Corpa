# Corpa

## Description of the problem to be solved

### Purpose of the system

The aim of the project is to facilitate the presentation or retrieval of business information.
The working principle is that the platform itself consists of two parts: a web application to be used by entrepreneurs, users and administrators, and an Application Programming Interface (API).
In order to use the platform, the entrepreneur will register with the web application and will be able to add the companies he has set up to the system. They will also be able to create a list of the company's branches and add the employees working in these branches. The information of the added companies can be viewed by a normal user of the system. The administrator will be able to change the roles of users, remove companies, branches or employees if they are added incorrectly.

### Functional requirements

A non-registered user of the system will be able to:

1. View the platform homepage;
2. log in (register) to the web application.

A registered user will be able to:

1. Log out of the application;
2. Login to the platform;
3. View the companies, branches and employees added to the system

As an CEO, users will be able to:

1. Log out of the web application;
2. Login to the platform;
3. Create a new company:

   - Fill in the company information form
   - Add branches
   - Add employees to the branches

4. View companies added by other CEO users;

The administrator will be able to:

1. Change user roles
2. Remove users
3. Remove inappropriate companies, branches, employees

## System architecture

System components:

- Front-End - using React.js;
- Back-End - using Node.js.
- Database - PostgreSQL.

![Diagram](https://user-images.githubusercontent.com/40595871/209195351-d0ebbccb-da85-45e0-9ce4-3abffdc88a80.png)
<sub>Deployment diagram</sub>

## User interface 

![chrome_Jmx8CHCuV2](https://user-images.githubusercontent.com/40595871/209196183-e70da92a-8b29-4d6a-a255-f74b9d7d3d69.png)
<sub>Main page</sub>

![chrome_ekAT8ISFHW](https://user-images.githubusercontent.com/40595871/209196390-97cdd613-9c1d-49f5-9129-9118abb22cd7.png)
<sub>Login modal</sub>

![chrome_Q4AcetbWR0](https://user-images.githubusercontent.com/40595871/209196299-669d4aba-5dd7-415c-8608-b39ece46fecc.png)
<sub>Register modal</sub>

![chrome_3T9Dcif9Iu](https://user-images.githubusercontent.com/40595871/209196541-ff4064cd-51a9-4e07-9592-c4b7bccd73c9.png)
<sub>Corporation list view</sub>

![chrome_b9JLHEBzWa](https://user-images.githubusercontent.com/40595871/209196665-d9bd55cb-f8c8-4799-8109-701b8afa1e67.png)
<sub>Branch list view (when the user is the owner of Corporation)</sub>

![chrome_gPAI3L0s0A](https://user-images.githubusercontent.com/40595871/209196835-cd3ca05b-db61-40b8-9017-21065731b2aa.png)
<sub>Worker list view</sub>

![chrome_BDVxxt2Tvl](https://user-images.githubusercontent.com/40595871/209196977-cc13f5f1-531c-436e-aa85-5dfd0929d3c9.png)
<sub>Delete modal</sub>

![chrome_q6tSGbXmrO](https://user-images.githubusercontent.com/40595871/209197017-63b1b164-56ff-4df0-9c08-74219baef6e8.png)
<sub>Edit modal</sub>

![chrome_9KMRIdFtFv](https://user-images.githubusercontent.com/40595871/209197067-f10910a5-fecb-487e-a94f-467045fb3cf7.png)
<sub>Add modal</sub>

## API specification

### Corporations
| API method | Get corporation (GET) |
|----------|------------ |
| Purpose	| Get corporation data |
| Route	| /api/corporations/{corporationId} |
| Body structure | - |
| Request header |	Authorization `Bearer {token}` |
| Response structure |	{ <br> &emsp; "id": "...", <br> &emsp; "name": "...", <br> &emsp; "description": "...", <br> &emsp; "creatorUserId": "..." <br> } |
| Response code	| 200 OK |
| Error codes	| 401 – unauthorized user. <br> 404 – if you can't find a corporation with the given id. |
| Request example	| localhost/api/corporations/835e695b-5313-452e-b467-e15a216999e9 |
| Request response example | { <br> &emsp; "id": "835e695b-5313-452e-b467-e15a216999e9", <br> &emsp; "name": "ARV auto", <br> &emsp; "description": "vairavimo mokykla", <br> &emsp; "creatorUserId": "5307ff19-f910-4c03-b994-ab3a9d1fc305" <br> } |

| API method |	Get corporations (GET) |
|----------|------------ |
| Purpose |	Get all corporations data |
| Route | /api/corporations |
| Body structure | - |
| Request header | Authorization `Bearer {token}` |
| Response structure | \[ <br> &emsp { <br> &emsp &emsp "id": "...", <br> &emsp &emsp "name": "...", <br> &emsp &emsp "description": "...", <br> &emsp &emsp "creatorUser": { <br> &emsp &emsp &emsp "id": "...", <br> &emsp &emsp &emsp "username": "..." <br> &emsp &emsp }, <br> &emsp &emsp "creatorUserId":"..." <br> &emsp }, ... <br>\] |
| Response code | 200 OK |
Galimi klaidų kodai	401 – neautorizuotas vartotojas.
Užklausos pavyzdys	localhost/api/corporations
Gauto atsakymo pavyzdys	[
    {
        "id": "835e695b-5313-452e-b467-e15a216999e9",
        "name": "ARV auto",
        "description": "vairavimo mokykla",
        "creatorUser": {
            "id": "5307ff19-f910-4c03-b994-ab3a9d1fc305",
            "username": "Tautvis"
        },
        "creatorUserId":"5307ff19-f910-4c03-b994-ab3a9d1fc305"
    },
    {
        "id": "0c66482c-df24-4bee-b698-23099e18062b",
        "name": "Norfa",
        "description": "Praktiski zmones renkasi norfa",
        "creatorUser": {
            "id": "5c5539ac-67a5-4938-8381-44a0d2aa6124",
            "username": "Tautvis123"
        },
        "creatorUserId":"5c5539ac-67a5-4938-8381-44a0d2aa6124"
    }
]

