import { useState } from 'react';
import doctorsListFile from './doctors_list.json'
export default function DoctorsList() {

    let doctorsArray = doctorsListFile.doctors;
    const [similarDoctorsArray, setSimilarDoctorsArray] = useState(null);
    const [currDoctor, setCurrDoctor] = useState(null);

    function handleShowSimilarDoctors(event) {
        let doctorPropsStr = event.currentTarget.innerHTML;
        let doctorPropsArray = doctorPropsStr.split(', ');
        setCurrDoctor(doctorPropsStr);
        setSimilarDoctorsArray(doctorsArray.filter(doctor => {
            return doctor.specialty === doctorPropsArray[2] 
            && doctor.name !== doctorPropsArray[0] 
            && doctor.location !== doctorPropsArray[1]
            && doctor.reviewScore !== doctorPropsArray[3];
        }).sort(sortByHigherReviewScore));
    }

    function sortByHigherReviewScore(a, b) {
        return b.reviewScore - a.reviewScore;
    }

    let doctorList = "";
    if (doctorsArray !== null) {
        doctorsArray.sort(sortByHigherReviewScore);
        doctorList = 
        <div> - List of Doctors
            <ul>
                {doctorsArray.map(doctor => (
                    <li key={doctorsArray.indexOf(doctor)}
                        onClick={handleShowSimilarDoctors}>
                        {doctor.name}, {doctor.location}, {doctor.specialty}, {doctor.reviewScore}
                    </li>
                ))}
            </ul>
        </div>
    }

    let currentDoctor = "";
    if (currDoctor !== null) {
        currentDoctor = 
        <div> - Current Doctor -
            <br></br>
            {currDoctor}
        </div>
    }

    let similarList = "";
    if (similarDoctorsArray !== null) {
        similarList = 
        <div> <br></br> - List of Similar Doctors:
        <ul>
                {similarDoctorsArray.map(doctor => (
                    <li key={similarDoctorsArray.indexOf(doctor)}
                        onClick = {(event) => handleShowSimilarDoctors(event)}>
                        {doctor.name}, {doctor.location}, {doctor.specialty}, {doctor.reviewScore}
                    </li>
                ))}
            </ul>
            </div>
    }

    return (
        <div>
            {doctorList}
            {currentDoctor}
            {similarList}
        </div>

    );
};