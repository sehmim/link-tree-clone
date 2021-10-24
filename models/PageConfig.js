import mongoose from "mongoose";
const { Schema } = mongoose

const PageConfigSchema = new Schema({
    userID: {
        type: String,
        required: true
    },
    logo: {
        url: {
            type: String,
            required: true
        }
    },
    social_links: [
        {
            icon: {
                type: String,
                required: true,
            },
            link: {
                type: String,
                required: true,
            }
        }
    ],
    arrow: {
        hide: {
            type: Boolean,
            required: true,
        }
    }
});

let PageConfigModel

try {
    PageConfigModel = mongoose.model('links')
} catch (error) {
    PageConfigModel = mongoose.model('links', PageConfigSchema);
}

export default PageConfigModel;