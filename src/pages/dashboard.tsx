
import { useEffect, useState } from "react";
import Header from "../components/Header";
import PageSection, {pageProps} from '../components/PageSection';
import RequestSection, {requestProps} from '../components/RequestSection';
import WhiteListSection from "../components/WhiteListSection";
import { getDatabase, ref, onValue } from "firebase/database";


//Create an array of faculty member objects
const pageArray: pageProps[] = [
    { pageName: 'Home Page', pageLink: '/' },
    { pageName: 'Faculty $FacultyName Profile Page', pageLink: '/' },
    { pageName: 'New Project $SuperCALAFRAGALISTICEXPIALADOCIOUSSuperCALAFRAGALISTICEXPIALADOCIOUS', pageLink: '/' },
];


const Dashboard = () => {
    const [snapshotTemp, setSnapshot] = useState<requestProps | object>({});
    const [requests, setRequests] =  useState<requestProps[]>([]);

    useEffect(() => {
        const db = getDatabase();
        const projects = ref(db, '/users');
        // Stores a listener for the database in a useState variable
        onValue(projects, (snapshot) => {
            setSnapshot(snapshot.val());
            // console.log('here', snapshot.val());
        });
    }, []);

     // Actually parses database information so it can be passed to other components
     useEffect(() => {
       
        for (const [, value] of Object.entries(snapshotTemp)) {
        
            const requestArr: requestProps[] = [];
            // // Acesses the requests object and converts it into an array
            for (const requestKey in value.requests) {
                const newRequest = value.requests[requestKey];
                requestArr.push({
                    requestLink: newRequest.requestLink,
                    requestName: newRequest.requestName,
                });
            }
            setRequests(requestArr);
        }
       
    }, [snapshotTemp]);



    return (
        <div>
            <Header title="User {UserName}'s Dashboard Page "/>
            <div style={{background:'rgb(224, 224, 224)'}}>
            <PageSection pages={pageArray} />
            <RequestSection requests={requests}/>
            <WhiteListSection/>
            </div>
        </div>
    );
};

export default Dashboard;