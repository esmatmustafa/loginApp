import React, { Component } from 'react';

import { AppRegistry, SectionList, StyleSheet, Text, View, Alert, Platform } from 'react-native';
const apiGetAllStudent = 'http://10.1.1.99/api/StudentInfo';

async function getDataFromServer() {

    try {

        let response = await fetch(apiGetAllStudent);

        let responseJson = await response.json();

        return responseJson.data; 

    } catch (error) {

        console.error(`Error is : ${error}`);

    }

}

export {getDataFromServer};