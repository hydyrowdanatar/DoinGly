import React from "react";

export default interface taskDto{
    uuid: string;
    text: string;
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
    key?: React.Key;
} 