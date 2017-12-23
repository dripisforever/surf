import React from 'react';
import Foo from './Foo';
import { Route, Switch } from 'react-router-dom';
const MainLayout = () => (
    <div className="body">
        <h1 className="title">MyApp</h1>
        <div className="content">
            <Switch>
                <Route exact path="/foo" component={Foo} />
                {/* <Route exact path="/bar" component={Bar} /> */}
            </Switch>
        </div>
    </div>
);

export default MainLayout;
