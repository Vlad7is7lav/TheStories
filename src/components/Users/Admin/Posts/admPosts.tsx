import React, { useState, useEffect } from "react"
import AdminLayout from "../../../hoc/adminLayout"
import axios from "axios"
import { Link } from "react-router-dom"
import { RouteComponentProps } from "react-router-dom"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import moment from "moment"

import { IUserData } from "../../../../store/reducers/TypesForStory"
import { UserReduceStateType } from "../../../../store/reducers/TypesForUser"

interface props extends RouteComponentProps {
    user: UserReduceStateType
}

const AdminPosts = (props: props) => {
    let [posts, setPosts] = useState<IUserData[]>([])

    useEffect(() => {
        if (props.user.userData === null || props.user.userData === false)
            return
        axios
            .get(`/api/stories/all_stories?owner=${props.user.userData.id}`)
            .then((response) => {
                setPosts(response.data)
            })
    }, [props])

    return (
        <AdminLayout>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Author</TableCell>
                            <TableCell>Created</TableCell>
                            <TableCell>Rating</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {posts.map((post, i) => (
                            <TableRow key={i}>
                                <TableCell>
                                    <Link to={`/admin/posts/edit/${post._id}`}>
                                        {post.name}
                                    </Link>
                                </TableCell>
                                <TableCell align="right">
                                    {post.author}
                                </TableCell>
                                <TableCell align="right">
                                    {moment(post.createdAt).format(
                                        "YYYY/MM/DD"
                                    )}
                                </TableCell>
                                <TableCell align="right">
                                    {post.rating}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </AdminLayout>
    )
}

export default AdminPosts
