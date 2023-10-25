
import Header from "../components/Header";
import PageSection, {pageProps} from '../components/PageSection';
// import RequestSection, {requestProps} from '../components/RequestSection';



//Create an array of faculty member objects
const pageArray: pageProps[] = [
    { pageName: 'Home Page', pageLink: '/' },
    { pageName: 'Faculty $FacultyName Profile Page', pageLink: '/' },
    { pageName: 'Project $ProjectName Page', pageLink: '/' },
];


// const requestArray: requestProps[] = [
//     { requestName: 'New Project $ProjectName', requestLink: '/' },
//     { requestName: 'New User Application', requestLink: '/' },
//     { requestName: 'Request to be Featured', requestLink: '/' },
//     { requestName: 'New Project $ProjectName', requestLink: '/' },
//     { requestName: 'New User Application', requestLink: '/' },
//     { requestName: 'Request to be Featured', requestLink: '/' },
//     { requestName: 'New Project $ProjectName', requestLink: '/' },
//     { requestName: 'New User Application', requestLink: '/' },
//     { requestName: 'Request to be Featured', requestLink: '/' }
// ];


const dashboard = () => {
    return (
        <div>
            <Header title="User {UserName}'s Dashboard Page "/>
            <PageSection pages={pageArray} />

            {/* <RequestSection requests={requestArray}/> */}

           <h1> This is the dashboard page</h1>
        </div>
    );
};

export default dashboard;