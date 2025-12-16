export interface Review {
    id: string;
    name: string;
    location: string;
    rating: number;
    date: string;
    title: string;
    content: string;
    verified: boolean;
}

export const REVIEWS: Review[] = [
    {
        id: '1',
        name: 'Michael Rodriguez',
        location: 'Houston, TX',
        rating: 5,
        date: '2024-12-15',
        title: 'Excellent Quality Container',
        content: 'Purchased a 40ft High Cube container for my construction business. The container arrived in perfect condition, exactly as described. Delivery was prompt and professional. Highly recommend Steel Container Store!',
        verified: true
    },
    {
        id: '2',
        name: 'Sarah Chen',
        location: 'Los Angeles, CA',
        rating: 4,
        date: '2024-12-10',
        title: 'Good Quality, Minor Issues',
        content: 'I bought a 20ft container to convert into a tiny home. The quality is good overall, though there were a few minor scratches. The team was helpful with questions about modifications. Overall a positive experience!',
        verified: true
    },
    {
        id: '3',
        name: 'James Thompson',
        location: 'Miami, FL',
        rating: 5,
        date: '2024-12-08',
        title: 'Fast Delivery and Great Service',
        content: 'Needed storage quickly for my business inventory. Steel Container Store delivered within 3 days. The container is in excellent condition and the price was very competitive. Will definitely order again.',
        verified: true
    },
    {
        id: '4',
        name: 'Emily Watson',
        location: 'Portland, OR',
        rating: 5,
        date: '2024-12-05',
        title: 'One Trip Container - Like New!',
        content: 'Purchased a one-trip 20ft container and it truly looks brand new. Perfect for my backyard office project. The customer service team answered all my questions promptly. Very satisfied!',
        verified: true
    },
    {
        id: '5',
        name: 'David Martinez',
        location: 'Phoenix, AZ',
        rating: 4,
        date: '2024-12-01',
        title: 'Good Value for Money',
        content: 'Compared prices across multiple vendors and Steel Container Store offered good value. The container arrived as promised with minor wear, but solid construction overall. Would recommend!',
        verified: true
    },
    {
        id: '6',
        name: 'Jennifer Lee',
        location: 'Seattle, WA',
        rating: 5,
        date: '2024-11-28',
        title: 'Perfect for Storage Needs',
        content: 'Bought two 40ft containers for our warehouse expansion. Both arrived in excellent condition. The delivery team was professional and placed them exactly where we needed. Great company!',
        verified: true
    },
    {
        id: '7',
        name: 'Robert Anderson',
        location: 'Denver, CO',
        rating: 4,
        date: '2024-11-25',
        title: 'Good Customer Support',
        content: 'Had some questions about modifications before purchasing. The sales team was knowledgeable and helped me choose the right container. The container had some minor surface rust but overall good quality.',
        verified: true
    },
    {
        id: '8',
        name: 'Lisa Johnson',
        location: 'Atlanta, GA',
        rating: 5,
        date: '2024-11-20',
        title: 'High Quality Container',
        content: 'Purchased a 20ft container for equipment storage. The quality exceeded my expectations. No dents, no rust, doors seal perfectly. Delivery was smooth and on time. Excellent service!',
        verified: true
    },
    {
        id: '9',
        name: 'Christopher Brown',
        location: 'Chicago, IL',
        rating: 4,
        date: '2024-11-18',
        title: 'Good for Construction Site',
        content: 'Rented several containers for our construction project. The rental process was easy and the containers were delivered quickly. Some had minor dents but were functional. Will use again!',
        verified: true
    },
    {
        id: '10',
        name: 'Amanda White',
        location: 'Boston, MA',
        rating: 5,
        date: '2024-11-15',
        title: 'Perfect Container for My Business',
        content: 'Bought a 40ft High Cube for my retail pop-up shop. The container is in pristine condition and perfect for my needs. The team helped me understand delivery requirements. Great experience!',
        verified: true
    },
    {
        id: '11',
        name: 'Daniel Garcia',
        location: 'San Diego, CA',
        rating: 5,
        date: '2024-11-12',
        title: 'Outstanding Quality and Service',
        content: 'Purchased a one-trip container and it looks brand new. The entire process from order to delivery was seamless. Professional team, great communication. Highly satisfied!',
        verified: true
    },
    {
        id: '12',
        name: 'Michelle Taylor',
        location: 'Nashville, TN',
        rating: 4,
        date: '2024-11-10',
        title: 'Good for Farm Storage',
        content: 'Bought a 40ft container for farm equipment storage. The container is weatherproof and secure. Delivery to our rural location was no problem. Some surface rust but overall good value!',
        verified: true
    },
    {
        id: '13',
        name: 'Kevin Moore',
        location: 'Dallas, TX',
        rating: 5,
        date: '2024-11-08',
        title: 'Perfect Condition Container',
        content: 'Received my 20ft container last week. It\'s in excellent condition - no issues at all. The delivery was professional and the container was placed exactly where I requested. Very pleased!',
        verified: true
    },
    {
        id: '14',
        name: 'Nicole Harris',
        location: 'Minneapolis, MN',
        rating: 4,
        date: '2024-11-05',
        title: 'Good Experience Overall',
        content: 'From initial inquiry to delivery, everything was smooth. The container quality is good with minor wear, and the price was fair. The team was responsive to all my questions. Would recommend!',
        verified: true
    },
    {
        id: '15',
        name: 'Thomas Wilson',
        location: 'Philadelphia, PA',
        rating: 5,
        date: '2024-11-02',
        title: 'Reliable and Professional',
        content: 'Purchased multiple containers for our business. Steel Container Store provided excellent service throughout. Containers arrived on time and in perfect condition. Will definitely order again!',
        verified: true
    },
    {
        id: '16',
        name: 'Rachel Green',
        location: 'Austin, TX',
        rating: 5,
        date: '2024-10-30',
        title: 'Perfect for My Tiny Home',
        content: 'Bought a 20ft container to convert into a tiny home. The quality is outstanding - no rust, perfect condition. The team was very helpful with modification advice. Great purchase!',
        verified: true
    },
    {
        id: '17',
        name: 'Mark Davis',
        location: 'Las Vegas, NV',
        rating: 4,
        date: '2024-10-28',
        title: 'Good Container Quality',
        content: 'Purchased a 40ft High Cube container. It arrived in good condition with some minor scratches, exactly as described. The delivery was professional and on time. Satisfied overall!',
        verified: true
    },
    {
        id: '18',
        name: 'Stephanie Clark',
        location: 'Charlotte, NC',
        rating: 5,
        date: '2024-10-25',
        title: 'Great Value and Service',
        content: 'Compared several vendors and Steel Container Store offered the best combination of price and quality. The container is in excellent condition and delivery was smooth. Highly recommend!',
        verified: true
    },
    {
        id: '19',
        name: 'Ryan Lewis',
        location: 'San Francisco, CA',
        rating: 4,
        date: '2024-10-22',
        title: 'Good for Office Conversion',
        content: 'Bought a 40ft container to convert into an office space. The quality is good with some surface wear, but the team provided great advice on modifications. Delivery was prompt. Happy overall!',
        verified: true
    },
    {
        id: '20',
        name: 'Lauren Walker',
        location: 'Detroit, MI',
        rating: 5,
        date: '2024-10-20',
        title: 'Outstanding Customer Service',
        content: 'The customer service team was incredibly helpful throughout the entire process. My container arrived in perfect condition and exactly on time. Great experience from start to finish!',
        verified: true
    },
    {
        id: '21',
        name: 'Brian Hall',
        location: 'Tampa, FL',
        rating: 4,
        date: '2024-10-18',
        title: 'Good Container for Storage',
        content: 'Purchased a 20ft container for business storage. The container is in good condition, weatherproof, and secure. Some minor dents but functional. Delivery was professional. Satisfied!',
        verified: true
    },
    {
        id: '22',
        name: 'Jessica Young',
        location: 'Portland, ME',
        rating: 5,
        date: '2024-10-15',
        title: 'Great Quality and Price',
        content: 'Bought a one-trip container and it looks brand new. The price was competitive and the quality is outstanding. The delivery team was professional. Highly recommend Steel Container Store!',
        verified: true
    },
    {
        id: '23',
        name: 'Matthew King',
        location: 'Kansas City, MO',
        rating: 3,
        date: '2024-10-12',
        title: 'Decent for Construction Site',
        content: 'Rented containers for our construction project. The rental process was okay. Some containers had more wear than expected, but they were functional. Delivery was timely. Acceptable overall.',
        verified: true
    },
    {
        id: '24',
        name: 'Ashley Wright',
        location: 'Columbus, OH',
        rating: 5,
        date: '2024-10-10',
        title: 'Excellent Experience',
        content: 'From initial contact to delivery, everything was smooth and professional. The container quality exceeded my expectations. Great value and outstanding service. Very pleased!',
        verified: true
    },
    {
        id: '25',
        name: 'Jason Lopez',
        location: 'Indianapolis, IN',
        rating: 4,
        date: '2024-10-08',
        title: 'Good Container Quality',
        content: 'Purchased a 40ft container for equipment storage. The container arrived in good condition with minor surface rust, but no major issues. Delivery was on time. Good service!',
        verified: true
    },
    {
        id: '26',
        name: 'Melissa Hill',
        location: 'Milwaukee, WI',
        rating: 5,
        date: '2024-10-05',
        title: 'Perfect Condition Container',
        content: 'Bought a 20ft one-trip container and it looks brand new. The quality is excellent and the price was fair. The team was very helpful with all my questions. Highly satisfied!',
        verified: true
    },
    {
        id: '27',
        name: 'Andrew Scott',
        location: 'Baltimore, MD',
        rating: 4,
        date: '2024-10-02',
        title: 'Good Service',
        content: 'The entire purchase process was smooth. My container arrived in good condition with some minor wear, but exactly on time. The customer service team was responsive. Good experience!',
        verified: true
    },
    {
        id: '28',
        name: 'Samantha Adams',
        location: 'Oklahoma City, OK',
        rating: 5,
        date: '2024-09-30',
        title: 'Excellent for Business Storage',
        content: 'Purchased multiple containers for our warehouse. All arrived in perfect condition. The delivery was professional and the containers were placed exactly where needed. Very satisfied!',
        verified: true
    },
    {
        id: '29',
        name: 'Justin Baker',
        location: 'Memphis, TN',
        rating: 4,
        date: '2024-09-28',
        title: 'Good Value and Quality',
        content: 'Compared prices and Steel Container Store offered good value. The container quality is decent with some wear, but delivery was prompt. The team was helpful throughout. Would recommend!',
        verified: true
    },
    {
        id: '30',
        name: 'Brittany Nelson',
        location: 'Louisville, KY',
        rating: 5,
        date: '2024-09-25',
        title: 'Perfect Container for My Needs',
        content: 'Bought a 40ft High Cube container for my business. The container is in pristine condition and perfect for my needs. Delivery was smooth and professional. Excellent service!',
        verified: true
    },
    {
        id: '31',
        name: 'Brandon Carter',
        location: 'Albuquerque, NM',
        rating: 4,
        date: '2024-09-22',
        title: 'Good Quality and Service',
        content: 'Purchased a one-trip container and it looks good overall. The process was seamless from order to delivery. Some minor scratches but professional team. Satisfied!',
        verified: true
    },
    {
        id: '32',
        name: 'Kayla Mitchell',
        location: 'Tucson, AZ',
        rating: 5,
        date: '2024-09-20',
        title: 'Great Experience',
        content: 'From initial inquiry to delivery, everything was smooth. The container quality is excellent and the price was competitive. The team was responsive to all questions. Highly recommend!',
        verified: true
    },
    {
        id: '33',
        name: 'Tyler Perez',
        location: 'Fresno, CA',
        rating: 4,
        date: '2024-09-18',
        title: 'Good for Storage',
        content: 'Bought a 20ft container for storage needs. The container arrived in good condition with some surface rust, but no major issues. Delivery was professional and on time. Pleased overall!',
        verified: true
    },
    {
        id: '34',
        name: 'Megan Roberts',
        location: 'Sacramento, CA',
        rating: 5,
        date: '2024-09-15',
        title: 'Outstanding Container Quality',
        content: 'Purchased a 40ft container and it exceeded my expectations. Perfect condition, no rust, doors work perfectly. The delivery team was professional. Excellent experience!',
        verified: true
    },
    {
        id: '35',
        name: 'Jordan Turner',
        location: 'Long Beach, CA',
        rating: 4,
        date: '2024-09-12',
        title: 'Good Service and Quality',
        content: 'The customer service team was helpful throughout. My container arrived in good condition with minor wear, but on time. Good value and service overall. Satisfied!',
        verified: true
    }
];

