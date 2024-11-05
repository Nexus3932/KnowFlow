import './scss/Header.scss';
import {Button, Input} from '@chakra-ui/react';
import { AiTwotoneAppstore } from "react-icons/ai";
import { AiTwotoneBell } from "react-icons/ai";
import { AiTwotoneTrophy } from "react-icons/ai";
import { GiDeathStar } from "react-icons/gi";
import '../font.css';

const Header = ()=> {
    return (
        <div className={'header'}>
            <div className={'header-inner'}>
                <div className={'header-inner-left'}>
                    <GiDeathStar className={'header-icon-idea'}></GiDeathStar>
                    <span style={{fontFamily: "'pacifico', sans-serif"}}>KnowFlow</span>
                    <Input className={'header-Input'} placeholder={'Search'} autoFocus={true}></Input>
                </div>
                <div className={'header-inner-right'}>
                    <Button>我要提问</Button>
                    <AiTwotoneBell className={'small-icon'} />
                    <AiTwotoneTrophy className={'small-icon'} />
                    <AiTwotoneAppstore className={'small-icon home-icon'} />
                </div>
            </div>
        </div>
    )
}

export default Header;