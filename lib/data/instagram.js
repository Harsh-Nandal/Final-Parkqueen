// Seed shape matches Instagram Graph API media objects.
// Swap for a live fetch once an access token + Business Account ID are available.
// Permalinks point to the real profile until individual post URLs are available via the API.
const PROFILE_URL = "https://www.instagram.com/parkqueenhotel_rohtak/?hl=en";

export const INSTAGRAM_POSTS = [
  { imageUrl: "https://res.cloudinary.com/dvanvxd7t/image/upload/v1785144442/parkqueen/service/insta1.jpg", caption: "Evenings at the rooftop.", permalink: PROFILE_URL },
  { imageUrl: "https://res.cloudinary.com/dvanvxd7t/image/upload/v1785143997/parkqueen/service/insta2.jpg", caption: "Queen Suite, undone.", permalink: PROFILE_URL },
  { imageUrl: "https://res.cloudinary.com/dvanvxd7t/image/upload/v1785144445/parkqueen/service/insta3.jpg", caption: "Banquet, ready for the big day.", permalink: PROFILE_URL },
  { imageUrl: "https://res.cloudinary.com/dvanvxd7t/image/upload/v1785143993/parkqueen/service/insta4.jpg", caption: "Fresh from the Queen kitchen.", permalink: PROFILE_URL },
  { imageUrl: "https://res.cloudinary.com/dvanvxd7t/image/upload/v1785144451/parkqueen/service/insta5.jpg", caption: "Haveli carvings, up close.", permalink: PROFILE_URL },
  { imageUrl: "https://res.cloudinary.com/dvanvxd7t/image/upload/v1785144453/parkqueen/service/insta6.jpg", caption: "Conference hall, set for the day.", permalink: PROFILE_URL },
];
