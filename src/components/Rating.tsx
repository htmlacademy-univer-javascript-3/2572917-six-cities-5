﻿import React from 'react';
import {IRatingProps} from '../types.ts';

export const Rating: React.FC<IRatingProps> = ({rating, objectType}) => (
  <div className={`${objectType}__rating rating`}>
    <div className={`${objectType}__stars rating__stars`}>
      <span style={{width: `${rating * 20}%`}}></span>
      <span className="visually-hidden">Rating</span>
    </div>
  </div>
);
