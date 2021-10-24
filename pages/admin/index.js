import styles from '../../styles/Home.module.css'

import { useState } from 'react'
import { LandingPage as PreView } from '../index'

import PageConfig from '../../models/PageConfig'
import dbConnect from '../../lib/dbConnect'

function Admin({ pageConfig }) {
    const [pageConfigState, setPageConfigState] = useState(pageConfig)

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', width: "100%" }}>
            <EditSide {...pageConfigState} />
            <PreViewWrapper {...pageConfigState} />
        </div>
    )
}

function PreViewWrapper(props) {
    console.log("PREVIEW", props)
    return (
        <div className={styles.containerPreview}>
            <PreView {...props} />
        </div>
    )
}

function EditSide({ logo, social_links, arrow }) {

    return (
        <div className={styles.editSideWrapperMain} >
            <h1 style={{ borderBottom: '1px solid', paddingBottom: '30px' }}>Dashboard | Edit your page </h1>

            <div className={styles.editItemWrapper}>
                <h5>Logo</h5>
                <input type="input" placeholder={logo.url} />
            </div>

            <div className={styles.editItemWrapper}>
                <h5>Social Links</h5>

                {
                    social_links.map(({ icon, link }) => {
                        return (
                            <div key={icon} style={{ display: 'flex', flexDirection: 'column', margin: '15px' }}>
                                <label>Icon Img Link</label>
                                <input type="input" placeholder={icon} />
                                <label>Redirect Link</label>
                                <input type="input" placeholder={link} />
                            </div>
                        )
                    })
                }
            </div>

            <div className={styles.editItemWrapper}>
                <h5>arrow</h5>

                <div>
                    <label>Show</label>
                    <input type="radio" />

                    <label>Hide</label>
                    <input type="radio" />
                </div>
            </div>

            <div className={styles.editItemWrapper}>
                <button>Update</button>
            </div>
        </div>
    )
}

export default Admin


export async function getServerSideProps() {
    try {
        await dbConnect()

    } catch (err) {
        console.log(err)
    }

    const rawQuotes = await PageConfig.findOne({ "userID": "1" })

    const dataString = JSON.stringify(rawQuotes)
    const pageConfig = JSON.parse(dataString)

    return {
        props: { pageConfig }
    }
}