import { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import PageSection, { pageProps } from "../components/PageSection";
import RequestSection, { requestProps } from "../components/RequestSection";
import WhiteListSection from "../components/WhiteListSection";
import { getDatabase, ref, onValue } from "firebase/database";
import { UserContext } from "../App";
import User, { UserInterface } from "../firebase/user";
import EditProfile from "../components/EditProfile";

const db = getDatabase(); //Global DB Connection

const Dashboard = () => {
  const [requests, setRequests] = useState<requestProps[]>([]);
  const [allowedUsersList, setAllowedUsersList] = useState<UserInterface[]>([]);
  const [pageArray, setPageArray] = useState<[]>([]);
  const user: User | null = useContext(UserContext);

  // Gets the user requests from the database
  useEffect(() => {
    //Check if user object is not empty
    if (!user) {
      return;
    }

    const requestRef = ref(db, `/requests`);

    onValue(requestRef, (snapshot) => {
      const requestList: requestProps[] = [];
      for (const [key, value] of Object.entries(snapshot.val())) {
        if (key != "placeholder") {
          requestList.push({ value: value, key: key });
        }
      }

      setRequests(requestList);
    });
  }, [user]);

  // gets the list of users from the database (ADMIN ONLY FEATURE)
  useEffect(() => {
    if (!user || user.userLevel != "Administrator") return;

    // Get the references to users and pending users
    const usersRef = ref(db, `/users`);
    // const pendingUsersRef = ref(db, '/pendingUsers');

    // Stores a listener for the database in a useState variable
    onValue(usersRef, (snapshot) => {
      const allowedUsersList: User[] = [];
      snapshot.forEach((child) => {
        const {
          email,
          name,
          photoURL,
          userLevel,
          phoneNumber,
          title,
          pronouns,
          department,
          location,
        } = child.val();
        allowedUsersList.push(
          new User(
            child.key,
            email,
            name,
            photoURL,
            userLevel,
            phoneNumber,
            title,
            pronouns,
            department,
            location
          )
        );
      });

      setAllowedUsersList(allowedUsersList);
    });
  }, [user]);

  useEffect(() => {
    if (!user) return;

    if (user.userLevel == "Administrator") {
      const pagesRef = ref(db, "/pages");

      // Stores a listener for the database in a useState variable
      onValue(pagesRef, (snapshot) => {
        const pages: [] = [];
        snapshot.forEach((child) => {
          const page = child.val();
          page.key = child.key;

          pages.push(page);
        });

        setPageArray(pages);
      });
    } else {
      const pagesRef = ref(db, "/pages/" + user.id);

      // Stores a listener for the database in a useState variable
      onValue(pagesRef, (snapshot) => {
        const pages: [] = [snapshot.val()];
        pages[0].key = snapshot.key;
        setPageArray(pages);
      });
    }
  }, [user]);

  // Get the list of projects from the database
  return (
    <div>
      <Header title={user ? `${user.name}'s Dashboard Page` : `Loading...`} />
      <div style={{ background: "rgb(224, 224, 224)" }}>
        <EditProfile user={user} />
        <PageSection pages={pageArray} />
        {user && (
          <>
            {(user.userLevel == "Administrator") && (
              <>
                <RequestSection requests={requests} />
                <WhiteListSection userArray={allowedUsersList} />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
