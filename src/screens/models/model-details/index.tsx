import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ModelData } from "@/screens/models/ModelData.ts";
import Container from "@/components/container";

import {StarIcon} from "@heroicons/react/16/solid";
import {IModel} from "@/interfaces/IModel.tsx";
import RatingsSection from '@/components/commensection';
import NewRatingBox from '@/components/editbox/rating';


const ModelDetail = () => {
    const { id } = useParams();
    if (!id) {
        return <div className="text-red-500">ID not found</div>;
    }
    const model: IModel | undefined = ModelData.find((m) => m.id === parseInt(id, 10));
    if (!model) {
        return <div className="text-red-500">Model not found</div>;
    }
    const [userRatingStars, setUserRatingStars] = useState<number | null>(null);
    const [userComment, setUserComment] = useState<string | null>(null);
    const [isRatingBoxVisible, setIsRatingBoxVisible] = useState<boolean>(false);

    const handleNewRatingSubmit = () => {
        // Update the user's rating
        console.log(userRatingStars);

        // Calculate new average rating
        //  ?????
    };

    const handleStarClick = (stars: number) => {
        setUserRatingStars(stars);
        setIsRatingBoxVisible(true);
    };
    return (
        <Container>
            <div className="mx-auto p-6 rounded-md mt-10">
                <div className="mb-8 pb-2 border-b border-gray-300">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">{model.title}</h1>
                    <p className="text-gray-500">User: {model.user}</p>
                </div>

                <div className="mb-8">
                    <h2 className="lg:text-3xl md:text-2xl sm:text-xl font-bold mb-4">Description</h2>
                    <p className="text-gray-800 leading-relaxed break-words font-thin">
                        {model.description}
                    </p>
                </div>

                <div className="mb-8">
                    <h2 className="lg:text-3xl md:text-2xl sm:text-xl font-bold mb-4">Model Details</h2>
                    <div className="mt-4 text-gray-800 leading-relaxed break-words font-thin">
                        <p>Inferences: {model.inferences}</p>
                        <p>Ratings: {model.ratings.stars} stars</p>
                    </div>
                </div>

                <div>
                    <h2 className="lg:text-2xl md:text-xl sm:text-lg font-bold mb-4">Rate this model</h2>
                    <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((stars) => (
                    <button
                        key={stars}
                        onClick={() => handleStarClick(stars)}
                        className={`mr-1 text-white-500 hover:text-yellow-600 ${
                            userRatingStars && userRatingStars >= stars ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                    >
                        <StarIcon className="w-6 h-6" />
                    </button>
                    ))}
                    </div>
                {/* Comment Section */}
                    <p onClick={() => setIsRatingBoxVisible(true)} className='ml-1 mt-2 text-blue-500 cursor-pointer'>Write a review</p>
                </div>
                {isRatingBoxVisible && (
                    <NewRatingBox
                        setIsRatingBoxVisible={setIsRatingBoxVisible}
                        setUserComment={setUserComment}
                        setUserRatingStars={setUserRatingStars}
                        userRatingStars={userRatingStars}
                        handleNewRatingSubmit={handleNewRatingSubmit}
                    />   
                )}
                {/* Comment Section */}
                <RatingsSection />
            
            </div>
        </Container>
    );
};

const ModelDetailWithRating: React.FC<{ model: IModel }> = ({ model }) => {
    const [userRating, setUserRating] = useState<number | null>(null);

    const handleVote = (stars: number) => {
        // Update the user's rating
        setUserRating(stars);

        // Calculate new average rating
        //  ?????
    };

    return (
        <div>
            {/* Star Rating */}
            <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((stars) => (
                    <button
                        key={stars}
                        onClick={() => handleVote(stars)}
                        className={`mr-1 text-white-500 hover:text-yellow-600 ${
                            userRating && userRating >= stars ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                    >
                        <StarIcon className="w-6 h-6" />
                    </button>
                ))}
                {userRating && (
                    <p className="text-gray-600 mr-2">Your Rating: {userRating.toFixed(1)} Stars</p>
                )}
            </div>
        </div>
    );
};

export default ModelDetail;
