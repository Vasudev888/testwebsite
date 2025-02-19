// import { useEffect, useState, useCallback } from "react";
// import { saveAs } from "file-saver";

// const useUserActivityTracker = () => {
//   const [events, setEvents] = useState([]);

//   const logEvent = useCallback((eventType, details = "") => {
//     const currentDateTime = new Date().toLocaleString(); // ✅ Human-readable date & time
//     setEvents((prevEvents) => [
//       ...prevEvents,
//       { eventType, details, timestamp: currentDateTime },
//     ]);
//   }, []);

//   useEffect(() => {
//     const handleButtonClick = (event) => {
//       if (event.target.tagName === "BUTTON" || event.target.closest("button")) {
//         const buttonId =
//           event.target.id || event.target.innerText || "Unnamed Button";
//         logEvent("Button Click", `Clicked: ${buttonId}`);
//       }
//     };

//     document.addEventListener("click", handleButtonClick);
//     return () => document.removeEventListener("click", handleButtonClick);
//   }, [logEvent]);

//   const exportCSV = () => {
//     if (events.length === 0) {
//       alert("No user activity recorded.");
//       return;
//     }

//     const csvContent = [
//       ["Event Type", "Details", "Timestamp"],
//       ...events.map(({ eventType, details, timestamp }) => [
//         eventType,
//         details,
//         timestamp,
//       ]),
//     ]
//       .map((row) => row.join(","))
//       .join("\n");

//     const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

//     // ✅ Generate a filename with current date and time
//     const fileName = `user_activity_${new Date()
//       .toISOString()
//       .replace(/[:.]/g, "-")}.csv`;

//     saveAs(blob, fileName);
//   };

//   return { logEvent, exportCSV };
// };

// export default useUserActivityTracker;

// import { useEffect, useState, useCallback } from "react";

// const useUserActivityTracker = () => {
//   const [events, setEvents] = useState([]);

//   // Function to send event data to Unity API
//   const sendToUnityAPI = async (eventData) => {
//     try {
//       await fetch("http://localhost:3000/", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(eventData),
//       });
//     } catch (error) {
//       console.error("Failed to send event to Unity:", error);
//     }
//   };

//   // Function to log and send events to Unity API
//   const logEvent = useCallback(
//     (eventType, details = "", section = "Unknown") => {
//       const timestamp = new Date().toISOString(); // Standardized timestamp
//       const eventData = { eventType, details, section, timestamp };

//       setEvents((prevEvents) => [...prevEvents, eventData]);

//       // Send event data to Unity API
//       sendToUnityAPI(eventData);
//     },
//     []
//   );

//   useEffect(() => {
//     const handleButtonClick = (event) => {
//       if (event.target.tagName === "BUTTON" || event.target.closest("button")) {
//         const buttonId =
//           event.target.id || event.target.innerText || "Unnamed Button";
//         const section =
//           event.target.closest("section")?.id || "Unknown Section";
//         logEvent("Button Click", `Clicked: ${buttonId}`, section);
//       }
//     };

//     document.addEventListener("click", handleButtonClick);
//     return () => document.removeEventListener("click", handleButtonClick);
//   }, [logEvent]);

//   return { events };
// };

// export default useUserActivityTracker;

// import { useEffect, useState, useCallback } from "react";
// import { saveAs } from "file-saver";

// const useUserActivityTracker = () => {
//   const [events, setEvents] = useState([]);
//   const [pageNavigations, setPageNavigations] = useState(
//     parseInt(localStorage.getItem("pageVisits")) || 0
//   );

//   // Function to log events and update state
//   const logEvent = useCallback(
//     (eventType, details = "") => {
//       const currentDateTime = new Date().toLocaleString();
//       const eventData = { eventType, details, timestamp: currentDateTime };

//       setEvents((prevEvents) => [...prevEvents, eventData]);

//       // Store navigation count in localStorage
//       localStorage.setItem("pageVisits", pageNavigations);
//     },
//     [pageNavigations]
//   );

//   // Track Button Clicks
//   useEffect(() => {
//     const handleButtonClick = (event) => {
//       if (event.target.tagName === "BUTTON" || event.target.closest("button")) {
//         const buttonId =
//           event.target.id || event.target.innerText || "Unnamed Button";
//         logEvent("Button Click", `Clicked: ${buttonId}`);
//       }
//     };

//     document.addEventListener("click", handleButtonClick);
//     return () => document.removeEventListener("click", handleButtonClick);
//   }, [logEvent]);

//   // Track Page Navigations
//   useEffect(() => {
//     const trackNavigation = () => {
//       setPageNavigations((prev) => {
//         const newCount = prev + 1;
//         localStorage.setItem("pageVisits", newCount);
//         logEvent("Page Navigation", `Navigated ${newCount} times`);
//         return newCount;
//       });
//     };

//     window.addEventListener("popstate", trackNavigation); // SPA Navigation
//     window.addEventListener("beforeunload", trackNavigation); // Page refresh or exit
//     document.addEventListener("visibilitychange", () => {
//       if (document.visibilityState === "visible") {
//         trackNavigation(); // Tab switch back to the page
//       }
//     });

//     return () => {
//       window.removeEventListener("popstate", trackNavigation);
//       window.removeEventListener("beforeunload", trackNavigation);
//       document.removeEventListener("visibilitychange", trackNavigation);
//     };
//   }, [logEvent]);

//   // CSV Export Function (Including Page Navigation)
//   const exportCSV = () => {
//     if (events.length === 0) {
//       alert("No user activity recorded.");
//       return;
//     }

//     const csvContent = [
//       ["Event Type", "Details", "Timestamp"],
//       ...events.map(({ eventType, details, timestamp }) => [
//         eventType,
//         details,
//         timestamp,
//       ]),
//     ]
//       .map((row) => row.join(","))
//       .join("\n");

//     const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
//     const fileName = `user_activity_${new Date()
//       .toISOString()
//       .replace(/[:.]/g, "-")}.csv`;

//     saveAs(blob, fileName);
//   };

//   return { events, exportCSV, pageNavigations };
// };

// export default useUserActivityTracker;
import { useEffect, useState, useCallback } from "react";
import { saveAs } from "file-saver";

const useUserActivityTracker = () => {
  const [events, setEvents] = useState([]);
  const [pageNavigations, setPageNavigations] = useState(
    parseInt(localStorage.getItem("pageVisits")) || 0
  );

  // Function to log events and update state
  const logEvent = useCallback((eventType, details = "") => {
    const currentDateTime = new Date().toLocaleString();
    const eventData = { eventType, details, timestamp: currentDateTime };
    setEvents((prevEvents) => [...prevEvents, eventData]);
  }, []);

  // Track Button Clicks
  useEffect(() => {
    const handleButtonClick = (event) => {
      if (event.target.tagName === "BUTTON" || event.target.closest("button")) {
        const buttonId =
          event.target.id || event.target.innerText || "Unnamed Button";
        logEvent("Button Click", `Clicked: ${buttonId}`);
      }
    };

    document.addEventListener("click", handleButtonClick);
    return () => document.removeEventListener("click", handleButtonClick);
  }, [logEvent]);

  // Track Page Navigations
  useEffect(() => {
    const trackNavigation = () => {
      setPageNavigations((prev) => {
        const newCount = prev + 1;
        // Directly log the event without waiting for state update
        logEvent("Page Navigation", `Navigated ${newCount} times`);
        // Update navigation count in localStorage
        localStorage.setItem("pageVisits", newCount);
        return newCount;
      });
    };

    window.addEventListener("popstate", trackNavigation); // SPA Navigation
    window.addEventListener("beforeunload", trackNavigation); // Page refresh or exit
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") {
        trackNavigation(); // Tab switch back to the page
      }
    });

    return () => {
      window.removeEventListener("popstate", trackNavigation);
      window.removeEventListener("beforeunload", trackNavigation);
      document.removeEventListener("visibilitychange", trackNavigation);
    };
  }, [logEvent]);

  // CSV Export Function (Including Page Navigation)
  const exportCSV = () => {
    if (events.length === 0) {
      alert("No user activity recorded.");
      return;
    }

    const csvContent = [
      ["Event Type", "Details", "Timestamp"],
      ...events.map(({ eventType, details, timestamp }) => [
        eventType,
        details,
        timestamp,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const fileName = `user_activity_${new Date()
      .toISOString()
      .replace(/[:.]/g, "-")}.csv`;

    saveAs(blob, fileName);
  };

  return { events, exportCSV, pageNavigations };
};

export default useUserActivityTracker;
