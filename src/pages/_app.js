import '@/styles/globals.css'
import { wrapper, store } from "../redux/store";
import { Provider } from "react-redux";
function MyApp({ Component, pageProps }) {
  return (
  <Provider store={store}>
  <div className="text-gray-600 body-font">
  <div className="container px-5 mx-auto">
        <Component {...pageProps} />

  </div>
  </div>
      </Provider>
  )
}
export default wrapper.withRedux(MyApp);