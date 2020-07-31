import React, {
    Component,
} from 'react';
import {
    View
} from 'react-native';
import Toast from './Toast';
import RootModal from '../RootModal';
export default class ToastView {


    static show = (image = '', message = '', duration = 1500, onDismiss = null) => {

        return RootModal.setView(
            <Toast
                message={message}
                image={image}
                duration={duration}
                onDismiss={onDismiss && onDismiss()}
            />
        )

    }
}