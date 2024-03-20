const users = [
    {
        userId: "fildata",
        name: "개발자 계정",
        password: "$2a$11$7Zsy5qWEEBxJr6Crgg8FKOuny4qH2nWfSjWSIyVkkg8wkGBWjRFcK",
        phone: {
            country: '+82',
            number: '01012345678',
        },
        userFg: '9',
        referralCode: '07e8703249d1e2dfee0a',
        referralUid: '',
        saleUid: 'fildata',
    },
    {
        userId: "admin",
        name: "관리자 계정",
        password: "$2a$11$BXAzQeZbBh3RHa3oN/YUIuV9RDOL9/hE7Kpa2QKD7cgEet/xTPaEC",
        phone: {
            country: '+82',
            number: '01012341234',
        },
        userFg: '6',
        referralCode: 'aa24c92b27947466817d',
        referralUid: '',
        saleUid: 'fildata',
    },
    {
        userId: "song",
        name: "송창익",
        password: "$2a$11$2nuwLGSr.cIr/pD1RV8lqOxQnLjQStx57tmrkgTl5MmvOEhinz2hy",
        phone: {
            country: '+82',
            number: '01027693890',
        },
        userFg: '6',
        referralCode: 'ad4886a5adbf7d924fdc',
        referralUid: '',
        saleUid: 'fildata',
    },
    {
        userId: "lee",
        name: "이영모",
        password: "$2a$11$aoeh59YEaVxdt4qeuE/98uDzOcD9vVtZAmhkIEU1nFBiuPBxFELuW",
        phone: {
            country: '+82',
            number: '01090306837',
        },
        userFg: '6',
        referralCode: '35a7fc21efd9b234abad',
        referralUid: '',
        saleUid: 'fildata',
    },
    {
        userId: "lee2",
        name: "이범석",
        password: "$2a$11$/OU8syBhkDVWv8OJb.pll.0mwVBcWVrw.tEBLz2omJivybqh1OF0u",
        phone: {
            country: '+82',
            number: '01066345472',
        },
        userFg: '3',
        referralCode: '9a83f16ec97a10fc5acc',
        referralUid: '',
        saleUid: 'lee2',
    },
    {
        userId: "yoo",
        name: "유상진",
        password: "$2a$11$Mc0z64P0l.zNS0idsZgGyegR2EIHFcAynjE8OUnSQq3QggU2qrwsa",
        phone: {
            country: '+82',
            number: '01012341234',
        },
        userFg: '3',
        referralCode: '4d6ec99245ac1671545e',
        referralUid: '',
        saleUid: 'yoo',
    },
    {
        userId: "sunam",
        name: "김수남",
        password: "$2a$11$Mc0z64P0l.zNS0idsZgGyegR2EIHFcAynjE8OUnSQq3QggU2qrwsa",
        phone: {
            country: '+82',
            number: '01012341235',
        },
        userFg: '1',
        referralCode: 'fe4ea9a5098579e4b483',
        referralUid: 'yoo',
        saleUid: 'yoo',
    },
    {
        userId: "subok",
        name: "김수복",
        password: "$2a$11$Mc0z64P0l.zNS0idsZgGyegR2EIHFcAynjE8OUnSQq3QggU2qrwsa",
        phone: {
            country: '+82',
            number: '01012341235',
        },
        userFg: '1',
        referralCode: '8a84df794d96ebaa6cb8',
        referralUid: 'sunam',
        saleUid: 'yoo',
    },
    {
        userId: "sumi",
        name: "김수미",
        password: "$2a$11$Mc0z64P0l.zNS0idsZgGyegR2EIHFcAynjE8OUnSQq3QggU2qrwsa",
        phone: {
            country: '+82',
            number: '01012344232',
        },
        userFg: '1',
        referralCode: '2f8729648ddfbbb4179e',
        referralUid: 'sunam',
        saleUid: 'yoo',
    },
];

const assets = [
    {
        userId: "fildata",
        name: "개발자 계정",
        totalAmount: 13200,
        totalStakeAmount: 10000,
        totalRewardAmount: 2500,
        totalCommissionAmount: 700,
        stakings: [
            {
                seq: 1,
                contractDt: '2024-01-01',
                sDt: '2024-01-02',
                eDt: '2025-06-25',
                duration: 540,
                elapsed: 23,
                amt: 10000,
                rewardAmt: 2500,
            },
        ]
    },
];
  
const getUsers = async () => {
    return Promise.resolve(users.map(user => {
        const { userId, name, password, phone, userFg, referralCode, referralUid, saleUid } = user;
        return { userId, name, password, phone, userFg, referralCode, referralUid, saleUid };
    }));
};

const getUserById = async (userId) => {
    const foundUser = users.find(u => u.userId === userId);
    return Promise.resolve(foundUser || null);
};

const getUserByPhone = async (phone) => {
    const foundUser = users.find(u => (u.phone.country === phone.country && u.phone.number === phone.number));
    return Promise.resolve(foundUser || null);
};

const getUserByReferralCode = async (referralCode) => {
    const foundUser = users.find(u => u.referralCode === referralCode);
    return Promise.resolve(foundUser || null);
};

const getAssetsById = async (userId) => {
    const foundAssets = assets.find(u => u.userId === userId);
    return Promise.resolve(foundAssets || null);
};


const createUser = async (user) => {
    users.push({
        userId: user.userId,
        name: user.name,
        password: user.password,
        phone: {
            country: user.phone.country,
            number: user.phone.number,
        },
        userFg: '1',
        referralCode: user.referralCode,
        referralUid: user.referralUid,
        saleUid: user.saleUid,
    });

    const newUser = users.find(u => u.userId === user.userId);
    return Promise.resolve(newUser || null);
};

const updateUserName = async (userId, name) => {
    const userToUpdate = users.find(user => user.userId === userId);
    
    if (!userToUpdate) {
        throw new Error(`User with userId ${userId} not found`);
    }
    
    userToUpdate.name = name;
    
    return userToUpdate;
};
  
const updateUserPassword = async (userId, password) => {
    const userToUpdate = users.find(user => user.userId === userId);
    
    if (!userToUpdate) {
        throw new Error(`User with userId ${userId} not found`);
    }
    
    userToUpdate.password = password;
    
    return userToUpdate;
};

export { getUsers, getUserById, getUserByPhone, getUserByReferralCode, getAssetsById, createUser, updateUserName, updateUserPassword }