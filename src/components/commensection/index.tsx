import React, { useState } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';

interface Comment {
    text: string;
    ratings: {
        stars: number;
    };
}

const RatingsSection: React.FC = () => {
    const [comments, setComments] = useState<Comment[]>([]);

    return (
        <div className="mt-8 mr-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Comments</h2>
            
            {/* Display Comments */}
            {comments.map((comment, index) => (
                <div key={index} className="border-t border-gray-300 mt-4 pt-4">
                    <p className="text-gray-600 mb-2">{comment.text}</p>
                </div>
            ))}
        </div>
    );
};

export default RatingsSection;
