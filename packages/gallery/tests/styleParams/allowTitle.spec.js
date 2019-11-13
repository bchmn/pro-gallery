import GalleryDriverNew from './galleryDriverNew/galleryDriver';
import { expect } from 'chai';
import { images2 } from '../constants/items';
import { styleParams, container } from '../constants/styles';

describe('styleParam - allowTitle', () => {

    let driver;
    const initialProps = {
        container,
        items: images2,
        styles: styleParams
    }

    beforeEach(() => {
        driver = new GalleryDriverNew();
    });

    afterEach(() => {
        driver.detachGallery();
    })

    it('should render title when allowTitle is true and item has a title', () => {
        Object.assign(initialProps.styles, {
            allowTitle:true
        })
        driver.mountGallery(initialProps);
        let titleElements = driver.find().hook('data-hook','item-title');
        //only 2 items have a title
        expect(titleElements.length).to.eq(2);

        Object.assign(initialProps.styles, {
            allowTitle:false
        });
        driver.setProps(initialProps);
        driver.update();
        console.log(driver.wrapper.props());
        
        titleElements = driver.find().hook('data-hook','item-title');
        expect(titleElements.length).to.eq(2);
    });
    it('should not render title when allowTitle is true and item does not have a title', () => {
        Object.assign(initialProps.styles, {
            allowTitle:true
        })
        driver.mountGallery(initialProps);
    });
    it('should not render title when allowTitle is false', () => {
        Object.assign(initialProps.styles, {
            allowTitle:false
        })
        driver.mountGallery(initialProps);  
    });
})