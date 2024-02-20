import { AppBar, Toolbar, Typography } from '@mui/material'

const Header = () => {
    return (
        <AppBar sx={{ zIndex: (theme: any) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
                <Typography variant="h6" noWrap component="div">
                    SpendWise
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Header
