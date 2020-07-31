import React, {
    Component,
} from 'react';
import {
    View
} from 'react-native';
import AlerView from './AlerView';
import RootModal from '../RootModal';
export default class Alert {


    static show = (title = '', message = '', option = []) => {

        return RootModal.setView(
            <AlerView
                title={title}
                message={message}
                visible={true}
                option={option}
            />
        )

    }
}