import './scss/List.scss'
import {Button} from "@chakra-ui/react";
import { FaCircleQuestion } from "react-icons/fa6";
import { IoPricetags } from "react-icons/io5";
import { FaUserAlt } from "react-icons/fa";
import { RiPoliceBadgeFill } from "react-icons/ri";

const List = () => {
    return (
        <div className={'list-container'}>
            <div className={'list-container-div1'}>
                <ul>
                    <li>
                        <Button leftIcon={<FaCircleQuestion/>} colorScheme='gray' variant='ghost' justifyContent="flex-start">问题</Button>
                    </li>
                    <li>
                        <Button leftIcon={<IoPricetags/>} colorScheme='gray' variant='ghost' justifyContent="flex-start">标签</Button>
                    </li>
                    <li>
                        <Button leftIcon={<FaUserAlt/>} colorScheme='gray' variant='ghost' justifyContent="flex-start">用户</Button>
                    </li>
                    <li>
                        <Button leftIcon={<RiPoliceBadgeFill/>} colorScheme='gray' variant='ghost' justifyContent="flex-start">徽章</Button>
                    </li>
                </ul>
            </div>

            <div className={'list-container-div2'}>
                <ul>
                    <li>
                        <span>管理</span>
                    </li>
                    <li>
                        <Button justifyContent="flex-start" colorScheme='gray' variant='ghost'>审查</Button>
                    </li>
                    <li>
                        <Button justifyContent="flex-start" colorScheme='gray' variant='ghost'>后台管理</Button>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default List;