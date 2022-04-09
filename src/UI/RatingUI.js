import React from 'react';
import { Rating } from '@mui/material';

const RatingUI = ({ rating }) => {
  let ratingCheck = rating == null ? 0 : rating;
  return <Rating name="read-only" value={ratingCheck} readOnly />;
};

export default RatingUI;
