import React from 'react'

import { HeaderProps } from './Types'
import { Box } from '@mui/material'
import { Title } from './Text'

export const Header: React.FC<HeaderProps> = ({
}) => {

    return (
    <Box
    className="Header"
    sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',        
        maxHeight: '100vh',
        minWidth: '100vw',
        backgroundColor: '#282a32',
        marginBottom:'1rem',
    }}>
        <Title text='LEGO   '/>
    </Box>
)}