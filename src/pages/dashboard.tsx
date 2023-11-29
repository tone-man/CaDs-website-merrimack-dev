
import { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import PageSection, { pageProps } from '../components/PageSection';
import RequestSection, { requestProps } from '../components/RequestSection';
import WhiteListSection from "../components/WhiteListSection";
import { getDatabase, ref, onValue } from "firebase/database";
import { UserContext } from "../App";
import User, { UserInterface } from "../firebase/user";
import EditProfile from "../components/EditProfile";

const db = getDatabase(); //Global DB Connection

//Create an array of faculty member objects
const pageArray: pageProps[] = [
    { pageName: 'Home Page', pageLink: '/' },
    { pageName: 'Melissa\'s Profile Page', pageLink: '/' },
];


const Dashboard = () => {
    const [snapshotTemp, setSnapshot] = useState<requestProps | object>({});
    const [requests, setRequests] = useState<requestProps[]>([]);
    const [allowedUsersList, setAllowedUsersList] = useState<UserInterface[]>([]);
    const user: User | null = useContext(UserContext);


    // Gets the user requests from the database
    useEffect(() => {
        //Check if user object is not empty
        if (!user)
            return;

        const requestRef = ref(db, `/requests`);

        onValue(requestRef, (snapshot) => {
            const requestList: requestProps[] = [];
            snapshot.forEach((request) => {
                requestList.push(request.val());
            });

            setRequests(requestList);
        })

    }, [user]);

    // gets the list of users from the database (ADMIN ONLY FEATURE)
    useEffect(() => {

        // if (!user || user.userLevel != "Administrator")
        //     return;

        // Get the references to users and pending users
        const usersRef = ref(db, `/users`);
        // const pendingUsersRef = ref(db, '/pendingUsers');

        // Stores a listener for the database in a useState variable
        onValue(usersRef, (snapshot) => {
            const allowedUsersList: User[] = [];
            snapshot.forEach((child) => {
                const { email, name, photoURL, userLevel } = child.val();
                allowedUsersList.push(new User(child.key, email, name, photoURL, userLevel));
            });

            setAllowedUsersList(allowedUsersList);
        })
    }, []);

    // Get the list of projects from the database
    return (
        <div>
            <Header title={(user) ?
                `${user.name}'s Dashboard Page` : `Loading...`
            } />
            <div style={{ background: 'rgb(224, 224, 224)' }}>

                <EditProfile user={user} onEdit={undefined} />
                <PageSection pages={pageArray} />
                {
                    (1 == 1) && (
                        <>
                            <RequestSection requests={requests} />
                            <WhiteListSection userArray={allowedUsersList} />
                        </>
                    )
                }
            </div>
        </div>
    );
};

export default Dashboard;