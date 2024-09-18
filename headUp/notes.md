### Brainstorming

- App should feature play, stop and reset buttons to capture the length of time the player is able to complete the challenge for. "Play" should trigger a timer on screen, "stop" would stop the timer, and "reset" would return the number to 0, ready for the next attempt to be captured.

- Stick-handling challenge should cycle between wide/long stick-handling, tight/narrow stick-handling, and figure of eight stick-handling around two cones.

- At random points, the app should prompt for the user to perform an "escape turn" whilst still maintaining possession of the puck - a turn on the spot - before returning to reading the numbers aloud, whilst executing the stick-handling challenge.



### Future iterations:

- The app should feature an 'Eyes closed' prompt that randomly appears at intervals to disrupt the nature of the challenge - would require a sound to trigger at the end of the phase to prompt user to open eyes again 




## How to implement multi-device functionality

To create an interface that allows multiple devices to connect and coordinate with each other, you would need to implement a real-time communication system. Here are some technologies and approaches you could consider integrating into your React application:

WebSocket: This protocol provides full-duplex communication channels over a single TCP connection. You can use libraries like socket.io or ws in your React application to establish a WebSocket connection between the server and the client devices. This would allow you to push updates (like the random numbers) to all connected devices in real-time.

WebRTC: This is a modern API that supports peer-to-peer communication between browsers. It's mainly used for video/audio streaming but can also be used for data transfer. You could use WebRTC to establish direct connections between devices if you want to avoid using a server for relaying data.

Server-Sent Events (SSE): This is a server push technology enabling a server to send events to the client. It's simpler than WebSockets but only allows one-way communication from server to client. It could be used if you only need to push updates from the server to the devices without needing the devices to communicate back to the server.

Firebase Realtime Database or Firestore: These are cloud-hosted databases from Google's Firebase platform that provide real-time data synchronization. By using Firebase, you can sync data across all devices in real-time without setting up your own backend infrastructure.

SignalR for ASP.NET Core: If you're comfortable with .NET, SignalR is a library for ASP.NET Core that simplifies adding real-time web functionality to applications. It uses WebSockets and other compatible technologies to enable real-time communication.

MQTT: This is a lightweight messaging protocol for small sensors and mobile devices, optimized for high-latency or unreliable networks. It's a good choice if you're also considering IoT elements in your application.

Polling/Ajax: As a last resort or for simple applications, you could use traditional HTTP polling to periodically send requests from the client to the server to check for updates. However, this is not recommended for real-time applications due to its inefficiency and latency issues.

For your specific use case, you would likely have a server component that manages the state of the game, including the random numbers to be displayed. The server would then push these numbers to the connected devices using one of the real-time technologies mentioned above. Each device would be a client that connects to the server and listens for updates, displaying the numbers as they are received.

Here's a high-level overview of how you might implement this:

1. Set up a backend server that can handle WebSocket connections (using socket.io, for example).
2. Modify your React application to connect to the WebSocket server.
3. When a player starts a session, the server starts sending random numbers to the connected devices at random intervals.
4. The devices display the numbers as they receive them, and the player reads them out while stickhandling.

Remember to handle cases where devices might disconnect or experience latency, and ensure that the user experience remains smooth throughout the training session.*




## How to incorporate sounds into the app

To play sounds in a React application, you can use the HTML5 `<audio>` element or a library like `react-sound` or `howler.js` to give you more control and flexibility. Here's a simple example of how you might implement this using the HTML5 `<audio>` element:

1. First, add the sound file to your public directory or import it into your component if you're using a module bundler like Webpack.

2. Create a React component that will play the sound when a certain phase of the challenge starts.

Here's a basic example of how you might structure the component:

```jsx
import React, { useState, useEffect } from 'react';

const ChallengePhase = ({ phase }) => {
  const [audio] = useState(new Audio('/path/to/your/sound.mp3'));

  useEffect(() => {
    // Play the sound when the phase changes to 'closeEyes'
    if (phase === 'closeEyes') {
      audio.play();
    }
  }, [phase, audio]);

  return (
    <div>
      {/* Your challenge content here */}
      {phase === 'closeEyes' && <p>Close your eyes!</p>}
      {phase === 'openEyes' && <p>Open your eyes!</p>}
    </div>
  );
};

export default ChallengePhase;
```

In this example, the `ChallengePhase` component takes a `phase` prop that determines the current phase of the challenge. When the `phase` changes to `'closeEyes'`, the sound is played.

To use this component, you would update the `phase` prop based on your application's logic, which would trigger the sound at the appropriate time.

If you need more advanced control over the sound playback (such as volume control, looping, or preloading), you might want to consider using a library like `howler.js`. Here's an example of how you might use `howler.js`:

First, install `howler`:

```sh
npm install howler
```

Then, use it in your component:

```jsx
import React, { useEffect } from 'react';
import { Howl } from 'howler';

const ChallengePhase = ({ phase }) => {
  useEffect(() => {
    const sound = new Howl({
      src: ['/path/to/your/sound.mp3'],
      autoplay: false,
      loop: false,
      volume: 0.5,
    });

    // Play the sound when the phase changes to 'closeEyes'
    if (phase === 'closeEyes') {
      sound.play();
    }

    // Optionally, clean up when the component unmounts
    return () => sound.unload();
  }, [phase]);

  return (
    <div>
      {/* Your challenge content here */}
      {phase === 'closeEyes' && <p>Close your eyes!</p>}
      {phase === 'openEyes' && <p>Open your eyes!</p>}
    </div>
  );
};

export default ChallengePhase;
```

In this example, `Howl` is used to create a sound object with the specified options. The sound is played when the `phase` changes to `'closeEyes'`. The `unload` method is called to clean up the sound object when the component unmounts, which is important to prevent memory leaks.

Remember to handle the user's interaction with your application before playing any audio to comply with browser policies regarding autoplaying sounds.



### next steps: 
1. Use the database to create a "leaderboard" tab

### nice to haves:
3. Puck wobble animation on play button hover doesn't work very well on mobile - fix this
1. For portfolio: have a video pop-up that explains what the app is all about, with clips of people using the app on ice etc.
2. enable websockets to control the app from a remote device such as a mobile or tablet device
2. include video / animation for each stickhandle type on screen
3. Train an AI to watch the person training through the camera, and identify when the person has fumbled the puck, then stop the clock
4. Create animation when user presses play: Puck should wobble a little bit and then "HEAD UP" heading should exit the screen by moving up and out of sight, before countdown starts and the handlePlay function is triggered
5. Create a 'pulse' animation, when game is active, each time a new number and stickhandleType is rendered, change the colour and the fade it back to the black colour