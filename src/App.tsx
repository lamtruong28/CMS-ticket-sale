import { Fragment, Suspense } from "react";
import { Spin } from "antd";
import { Routes, Route } from "react-router-dom";
import { routes } from "~/routes";
import DefaultLayout from "./layouts/DefaultLayout";

function App() {
    return (
        <Routes>
            {routes.map((route, index) => {
                let Layout: any = DefaultLayout;
                if (route.layout) Layout = route.layout;
                else if (route.layout === null) Layout = Fragment;
                const Page = route.component;
                return (
                    <Route
                        key={index}
                        path={route.path}
                        element={
                            <Layout>
                                <Suspense
                                    fallback={
                                        <Spin
                                            style={{
                                                height: "100%",
                                                width: "100%",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                            }}
                                        />
                                    }
                                >
                                    <Page />
                                </Suspense>
                            </Layout>
                        }
                    />
                );
            })}
        </Routes>
    );
}

export default App;
