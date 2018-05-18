import React from 'react'
import {
    Route,
    Redirect,
} from 'react-router-dom'

export function ProtectedRoute ({component: Component, auth, redirect = '/', ...rest}) {
    return (
        <Route
            {...rest}
            render={(props) => auth === true
                ? <Component {...props} />
                : <Redirect to={{pathname: redirect}} />}
        />
    )
}