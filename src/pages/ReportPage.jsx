import React from 'react'
import MainLayout from '../layouts/MainLayout'
import { useEffect, useState, useRef } from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';

function ReportPage(props) {
    //const { state } = useParams();
    let { postId } = useParams();
 
  
  

  return (
    <MainLayout>
    <div>ReportPage</div>
    <div>Post ID: {postId}</div>

    </MainLayout>
  )
}

export default ReportPage