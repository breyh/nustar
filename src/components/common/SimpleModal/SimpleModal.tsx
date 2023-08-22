import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Modal } from 'native-base';

export interface ISimpleModal {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
}

const SimpleModal = ({ isOpen, onClose, children, title }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} safeAreaTop={true} avoidKeyboard>
            <Modal.Content maxWidth="90%">
                <Modal.CloseButton onPress={onClose} />
                <Modal.Header>{title}</Modal.Header>
                <Modal.Body>
                    {children}
                </Modal.Body>
            </Modal.Content>
        </Modal>
    )
}

export default SimpleModal

const styles = StyleSheet.create({})