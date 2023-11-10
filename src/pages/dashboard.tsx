
import { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import PageSection, {pageProps} from '../components/PageSection';
import RequestSection, {requestProps} from '../components/RequestSection';
import WhiteListSection from "../components/WhiteListSection";
import { getDatabase, ref, onValue } from "firebase/database";
import { UserContext } from "../App";

const db = getDatabase(); //Global DB Connection

//Create an array of faculty member objects
const pageArray: pageProps[] = [
    { pageName: 'Home Page', pageLink: '/' },
    { pageName: 'Faculty $FacultyName Profile Page', pageLink: '/' },
    { pageName: 'New Project $SuperCALAFRAGALISTICEXPIALADOCIOUSSuperCALAFRAGALISTICEXPIALADOCIOUS', pageLink: '/' },
];


const Dashboard = () => {
    const [snapshotTemp, setSnapshot] = useState<requestProps | object>({});
    const [requests, setRequests] =  useState<requestProps[]>([]);
    const user = useContext(UserContext);

    const whiteList = {}; // This stores the whitelist of users

     // Gets the user requests from the database
     useEffect(() => {
        //Check if user object is not empty
        if (!user)
            return;

        const requestRef = ref(db, `/requests/${user.uid}`);
        
        onValue (requestRef, (snapshot) => {
            const requestList : requestProps[] = [];
            snapshot.forEach((request) => {
                requestList.push(request.val());
            });

            setRequests(requestList);
        })
       
    }, [user]);

    // gets the list of users from the database (ADMIN ONLY FEATURE)
    useEffect(() => {

        if (!user || user.data.user_level != "Administrator") //TODO: Ensure that user is admin
            return;

        // Get the references to users and pending users
        const usersRef = ref(db, `/users`);
        // const pendingUsersRef = ref(db, '/pendingUsers');

        // Stores a listener for the database in a useState variable
        onValue(usersRef, (snapshot) => {

            snapshot.forEach((child) => {
                whiteList[child.key] = child.val();
            });
            
        });

    }, [user]);

    // Get the list of requests from the database

    // Get the list of projects from the database


    return (
        <div>
            <Header title={(user) ?
                `${user.data.name}'s Dashboard Page` : `Loading...`
                }/>
            <div style={{background:'rgb(224, 224, 224)'}}>
            <PageSection pages={pageArray} />
            <RequestSection requests={requests}/>
            <WhiteListSection/>
            </div>
        </div>
    );
};

export default Dashboard;