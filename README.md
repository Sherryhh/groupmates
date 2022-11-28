
<h1 align="center">Groupmates</h1>

## Features

- Sign-in/Sign-up/Sign-out
- Dashboard: maintain personal information
- User: looking for individuals to form a group
- Group: looking for groups to join
- My Group: <br>
    - Group Dashboard: maintain group information <br>
    - Request: process invite or join request



## Usage

1. Clone project code.

```bash
git clone https://github.com/Sherryhh/groupmates
cd groupmates/frontend
```

2. Installation dependence.

```bash
yarn install
```

Or

```bash
npm install
```

3. Running the application

```bash
npm run start
```
In a different tab (please change password accordingly in the `frontend/api/index.js`)
```bash
cd api
python3 run.py
```

5. For login page, please refer to `frontend/mock/user.js` for now for current registered users (will be update in the future)


## Citation
The frontend of this project is adapt from [antd-admin](https://github.com/zuiidea/antd-admin) and rely on ant design.
