'use client'
import { useEffect, useState } from "react";
import { useRouter} from 'next/navigation';
import Link from "next/link";

function Main() {
  const [imageDataURL, setImageDataURL] = useState(null);
  const router = useRouter(); // Use useRouter from Next.js

  useEffect(() => {
    // Retrieve the image data from local storage
    // const { username, password } = router.query; // Destructure the query parameters

    const url = window.location.href;

  // Create a regular expression object.
  const regex = new RegExp(/(\?username=)([^\&]+)(&password=)([^\&]+)/);

  // Match the regex against the URL.
  const match = regex.exec(url);

  // Extract the username and password from the matched groups.
    const username = match[2];
    const password = match[4];

    console.log('Username:', username);
    console.log('Password:', password);

    // Retrieve the image data from local storage
    const storedData = typeof username === 'string' ? localStorage.getItem(username) : null;

    if (storedData) {
      const parsedData = JSON.parse(storedData);
      const username = parsedData.username; // Access the username
      const password = parsedData.password; // Access the password
      const imageDataFromLocalStorage = parsedData.image; // Access the image
      console.log('Username:', username);
      console.log('Password:', password);
      console.log('Image:', imageDataFromLocalStorage);
    
    console.log("Retrieved image data:", imageDataFromLocalStorage);
  
    if (imageDataFromLocalStorage) {
      // Set the retrieved image data to the state variable
      setImageDataURL(imageDataFromLocalStorage);
    }
  }

    // Rest of your code...
  });

  return (
    <div>
      <Link href="/">Home</Link>
      <h1>Main Page</h1>
      <p>This is the main page content.</p>
      {imageDataURL && (
        <img
          src={imageDataURL}
          alt="Uploaded Image"
          style={{ maxWidth: "100%" }}
        />
      )}
    </div>
  );
}

export default Main;