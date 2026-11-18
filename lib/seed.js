// Mock profiles used to seed the feed. Photos are placeholder images.
const RAW_PROFILES = [
  { id: 'p01', name: 'Aanya Sharma', age: 24, city: 'New Delhi', bio: 'Architect by day, amateur baker by night. Looking for someone to split dessert with.', interests: ['Baking', 'Architecture', 'Travel'] },
  { id: 'p02', name: 'Rohan Mehta', age: 27, city: 'Bengaluru', bio: 'Trail runner and a terrible puns enthusiast. Coffee snob, no apologies.', interests: ['Running', 'Hiking', 'Coffee'] },
  { id: 'p03', name: 'Meera Iyer', age: 25, city: 'Chennai', bio: 'Classical dancer and film buff. I will judge your playlist, kindly.', interests: ['Dance', 'Films', 'Music'] },
  { id: 'p04', name: 'Kabir Singh', age: 29, city: 'Gurugram', bio: 'Startup person who promises to talk about something other than work.', interests: ['Chess', 'Cricket', 'Startups'] },
  { id: 'p05', name: 'Ishita Rao', age: 23, city: 'Pune', bio: 'Final-year design student. There is always a sketchbook in my bag.', interests: ['Design', 'Sketching', 'Museums'] },
  { id: 'p06', name: 'Arjun Nair', age: 26, city: 'Kochi', bio: 'Surfing when the waves cooperate, reading when they do not.', interests: ['Surfing', 'Reading', 'Cooking'] },
  { id: 'p07', name: 'Sanya Kapoor', age: 24, city: 'Mumbai', bio: 'Open mic comedy on Thursdays. Come heckle me, I dare you.', interests: ['Comedy', 'Theatre', 'Podcasts'] },
  { id: 'p08', name: 'Dev Malhotra', age: 28, city: 'Jaipur', bio: 'Photographer chasing golden hour across the desert roads.', interests: ['Photography', 'Travel', 'Cycling'] },
  { id: 'p09', name: 'Tara Menon', age: 22, city: 'Hyderabad', bio: 'Med student who still reads novels at 2am. Biryani is a personality trait.', interests: ['Reading', 'Yoga', 'Biryani'] },
  { id: 'p10', name: 'Vikram Reddy', age: 30, city: 'Hyderabad', bio: 'Gym in the morning, board games at night. Will bring the dice.', interests: ['Fitness', 'Board games', 'Tech'] },
  { id: 'p11', name: 'Nisha Verma', age: 25, city: 'Lucknow', bio: 'Chai first, questions later. Happiest on a long train journey.', interests: ['Trains', 'Chai', 'Writing'] },
  { id: 'p12', name: 'Ayaan Khan', age: 27, city: 'Bhopal', bio: 'Football on weekends, documentaries on weeknights.', interests: ['Football', 'Documentaries', 'Cooking'] },
  { id: 'p13', name: 'Diya Joshi', age: 23, city: 'Ahmedabad', bio: 'Pottery teacher with clay under my nails and a plant for every window.', interests: ['Pottery', 'Plants', 'Art'] },
  { id: 'p14', name: 'Kunal Bose', age: 26, city: 'Kolkata', bio: 'Literature grad who would rather argue about books than watch movies.', interests: ['Literature', 'Debate', 'Football'] },
  { id: 'p15', name: 'Riya Desai', age: 24, city: 'Surat', bio: 'Marketing by profession, karaoke by passion. Choose a song for our first date.', interests: ['Karaoke', 'Marketing', 'Fashion'] },
  { id: 'p16', name: 'Siddharth Jain', age: 29, city: 'Indore', bio: 'Engineer who builds things on weekends. Ask me about my over-engineered fridge.', interests: ['Engineering', 'DIY', 'Cycling'] },
  { id: 'p17', name: 'Pooja Nambiar', age: 25, city: 'Mysuru', bio: 'Classical music, dosa, and long walks past the palace grounds.', interests: ['Music', 'Food', 'Walking'] },
  { id: 'p18', name: 'Aditya Pillai', age: 28, city: 'Coimbatore', bio: 'Mountain weekends and a strong opinion on monsoon weather.', interests: ['Trekking', 'Weather', 'Photography'] },
  { id: 'p19', name: 'Zara Ahmed', age: 22, city: 'Aligarh', bio: 'Law student, sunset chaser, cafe hopper. Recommend me a good bookshop.', interests: ['Law', 'Cafes', 'Books'] },
  { id: 'p20', name: 'Mihir Shah', age: 27, city: 'Vadodara', bio: 'Finance by day, board games and tabletop roleplay by night.', interests: ['Finance', 'Tabletop', 'Quizzes'] },
  { id: 'p21', name: 'Kavya Hegde', age: 24, city: 'Mangaluru', bio: 'Coastal kid who now lives in a flat with too many books.', interests: ['Books', 'Sea', 'Cooking'] },
  { id: 'p22', name: 'Yash Bhatia', age: 26, city: 'Chandigarh', bio: 'Drummer in a band that is almost famous. Gigs on Fridays.', interests: ['Music', 'Drums', 'Gigs'] },
  { id: 'p23', name: 'Anika Das', age: 23, city: 'Guwahati', bio: 'Botany student who keeps a notebook of every bird I see.', interests: ['Birdwatching', 'Botany', 'Hiking'] },
  { id: 'p24', name: 'Rahul Tiwari', age: 31, city: 'Varanasi', bio: 'Historian who thinks the best conversations happen by the river.', interests: ['History', 'Walking', 'Poetry'] },
  { id: 'p25', name: 'Sneha Pandey', age: 25, city: 'Patna', bio: 'Radio producer. I talk for a living, so I am a good listener on dates.', interests: ['Radio', 'Podcasts', 'Music'] },
  { id: 'p26', name: 'Farhan Qureshi', age: 28, city: 'Lucknow', bio: 'Architect of very small gardens and very large opinions about kebabs.', interests: ['Gardening', 'Food', 'Architecture'] },
  { id: 'p27', name: 'Lakshmi Krishnan', age: 24, city: 'Madurai', bio: 'Dancer, teacher, collector of old postcards. Ask about my favourite one.', interests: ['Dance', 'Teaching', 'Postcards'] },
  { id: 'p28', name: 'Nikhil Gupta', age: 30, city: 'Noida', bio: 'Product manager who runs marathons at a very relaxed pace.', interests: ['Running', 'Product', 'Coffee'] },
  { id: 'p29', name: 'Tanvi Saxena', age: 22, city: 'Kanpur', bio: 'Economics student. I cook for friends more than I should.', interests: ['Economics', 'Cooking', 'Films'] },
  { id: 'p30', name: 'Omkar Patil', age: 27, city: 'Nagpur', bio: 'Wildlife photographer waiting for the next tiger sighting.', interests: ['Wildlife', 'Photography', 'Safari'] },
  { id: 'p31', name: 'Hira Siddiqui', age: 25, city: 'Meerut', bio: 'Pharmacist with a soft spot for old Bollywood and fresh mangoes.', interests: ['Cinema', 'Food', 'Reading'] },
  { id: 'p32', name: 'Shreya Bose', age: 23, city: 'Bhubaneswar', bio: 'Illustrator who draws people on the metro. Do not worry, I draw kindly.', interests: ['Illustration', 'Metro', 'Coffee'] },
];

// Profiles in this list have already liked the logged-in user, so matches
// can happen during a demo. This list is server-side only and is never
// returned by any API route.
export const INBOUND_LIKE_IDS = ['p03', 'p07', 'p12', 'p18', 'p22', 'p26', 'p29', 'p31'];

export const PROFILES = RAW_PROFILES.map((p) => ({
  ...p,
  photo: `https://picsum.photos/seed/coy-${p.id}/600/800`,
}));
