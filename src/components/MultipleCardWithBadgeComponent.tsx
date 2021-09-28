import React from 'react';
import SpaceComponent from '../components/SpaceComponent/SpaceComponent';
import CardComponent from '../components/CardComponent/CardComponent';
import BadgeComponent from '../components/BadgeComponent/BadgeComponent';
import LabelComponent from '../components/LabelComponent';
import AvatarComponent from '../components/AvatarComponent/AvatarComponent';
import ListComponent from './ListComponent/ListComponent';
import { FONT_COLOR_FOR_LABEL_COMPONENT } from "../utils/globalTypes";

interface Iprops {
    dataSource?: any;
    loadingSkeleton?: boolean;
    skeletonCount?: number;
    cardMainHeaderText?: string;
    uniqueClassName?: string;
    addDataInCard?: boolean;
    headerToRender?: any;
}

function MultipleCardWithBadgeComponent(props: Iprops) {
    const { addDataInCard = true, headerToRender = null, dataSource, loadingSkeleton = true, skeletonCount = 4, cardMainHeaderText = 'Card Main Header Text', uniqueClassName = "" } = props;

    function getDescriptionOfMultipleCardComponet(descriptionDataArray: any, uniqueKeyForDescriptionList: string) {
        return <SpaceComponent className={uniqueKeyForDescriptionList} direction="vertical" size={20}>
            {descriptionDataArray && descriptionDataArray.map((descriptionData: any, index: any) => {
                return (<BadgeComponent key={index + descriptionData.badgeText + descriptionData.cardDescription} badgeRibbon={true} color={"blue"} placement={"end"} text={descriptionData.badgeText}>
                    <CardComponent
                        borderValue={true}
                        addCardInList={false}
                        dataSource={[{
                            description: <LabelComponent fontSizeValue={"14px"} headingLevel={5} color={FONT_COLOR_FOR_LABEL_COMPONENT}>{descriptionData.cardDescription}</LabelComponent>
                        }]} />
                </BadgeComponent>)
            })}
        </SpaceComponent>
    }

    let listData = null;
    if (!addDataInCard) {
        let dataSourceToRender = dataSource.map(function (data: any) {
            const { descriptionArray = [], uniqueKeyForDescriptionList = '', avatar, className } = data;
            let descriptionValue = getDescriptionOfMultipleCardComponet(descriptionArray, uniqueKeyForDescriptionList);
            return {
                description: descriptionValue,
                title: data.title,
                avatar,
                className,
            }
        });
        listData = <ListComponent
            hasBorder={false}
            isLoading={loadingSkeleton}
            headerToRender={headerToRender}
            componentToRender={dataSourceToRender}
            addListInMeta={true}
        />
    } else {
        let componentArrayToRender = loadingSkeleton ? [...new Array(skeletonCount)].map(() => { return { metaTitle: "", description: "" } }) : dataSource;
        listData = (componentArrayToRender && componentArrayToRender.map(function (data: any, index: any) {
            const { description = '', metaTitle = '', coverValue = null, widthValue = undefined, uniqueKey = "skeleton", descriptionArray = [], uniqueKeyForDescriptionList = '', uniqueKeyForList } = data;
            return <React.Fragment key={`${index}${uniqueKeyForList}`}>
                <SpaceComponent>
                    <CardComponent
                        avatarValue={true}
                        addCardInList={false}
                        loadingSkeleton={loadingSkeleton}
                        borderValue={true}
                        dataSource={[{
                            uniqueKey,
                            metaTitle,
                            description: loadingSkeleton ? description : getDescriptionOfMultipleCardComponet(descriptionArray, uniqueKeyForDescriptionList),
                            cover: coverValue !== null ? <AvatarComponent
                                alt={coverValue.altValue}
                                icon={coverValue.iconValue}
                            /> : null,
                            widthValue
                        }]}
                    />
                </SpaceComponent>
            </React.Fragment>
        })) || null;
    }

    return (<>
        {cardMainHeaderText !== '' && <LabelComponent styleObjectValue={{ background: "#1f2227", padding: "20px" }} showLine={true} headingLevel={2}>{cardMainHeaderText}</LabelComponent>}
        <div className={`${!loadingSkeleton ? '' : 'loading '}${uniqueClassName}`}>
            {listData}
        </div>
    </>)
}

export default MultipleCardWithBadgeComponent