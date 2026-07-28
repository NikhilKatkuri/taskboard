const warmGreetings = [
  {
    timeSlot: "morning",
    phrases: [
      "Good morning, $NAME.",
      "Have a great morning!",
      "Welcome back, $NAME.",
      "Rise and shine!",
      "Ready to tackle today?",
      "Morning, $NAME!",
    ],
  },
  {
    timeSlot: "afternoon",
    phrases: [
      "Good afternoon, $NAME.",
      "Hope your day is going well.",
      "Welcome back, $NAME.",
      "What's on the agenda?",
      "Afternoon, $NAME!",
      "Glad you're here.",
    ],
  },
  {
    timeSlot: "evening",
    phrases: [
      "Good evening, $NAME.",
      "Ending strong?",
      "Welcome back, $NAME.",
      "Evening, $NAME!",
      "Winding down?",
      "Good to see you.",
    ],
  },
];

function getTimeSlot(date = new Date()) {
  const hours = date.getHours();

  if (hours >= 5 && hours < 12) {
    return "morning";
  } else if (hours >= 12 && hours < 17) {
    return "afternoon";
  } else if (hours >= 17 && hours < 21) {
    return "evening";
  } else {
    return "night";
  }
}

function greetUser(name: string, date = new Date()): string {
  const timeSlot = getTimeSlot(date);
  const phrases =
    warmGreetings.find((g) => g.timeSlot === timeSlot)?.phrases || [];
  const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)] || "Hello, $NAME!";

  if (randomPhrase.includes("$NAME")) {
    return randomPhrase.replace("$NAME", name);
  }
  return randomPhrase;
}

export { greetUser, getTimeSlot };
