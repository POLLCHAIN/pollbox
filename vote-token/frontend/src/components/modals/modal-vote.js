import { useState } from 'react';
import axios from 'axios';
import Modal from "react-modal";
import CircularProgress from '@material-ui/core/CircularProgress';
import toast from "react-hot-toast";
import Querystring from "query-string"

import { formatNum } from "../../utils";
import * as Element from "./style";

function ModalVote(props) {
    const { account, balance, tokenSymbol, proposalId, choice, showVoteModal, setShowVoteModal } = props;
    const [message, setMessage] = useState('');
    const [votingStatus, setVotingStatus] = useState(false);

    function closeVoteModal() {
        setShowVoteModal(false);
        setMessage('');
    }

    async function voteProposal() {
        if (votingStatus) {
            return;
        }
        if (balance <= 0) {
            toast.error("You don't own THRY token");
            return;
        }

        setVotingStatus(true);
        const load_toast_id = toast.loading("Please wait for Voting...");
        axios.post(`${process.env.REACT_APP_API_URL}/api/vote/create`, Querystring.stringify({
            proposalId: proposalId,
            choice: choice,
            address: account,
            message: message
        }))
            .then(async (res) => {
                toast.dismiss(load_toast_id);
                setVotingStatus(false);
                if (res) {
                    toast.success("Voted successfully!");
                    window.open(`/proposal-detail/${proposalId}`, "_self");
                    return;
                } else {
                    toast.error('unknown error in the server. please try again later');
                    return;
                }

            })
            .catch(err => {
                toast.dismiss(load_toast_id);
                setVotingStatus(false);
                toast.error(err.response.data.message);
                return;
            })
    }

    return (
        <>
            {
                account && choice &&
                <Modal
                    isOpen={showVoteModal}
                    onRequestClose={() => closeVoteModal()}
                    ariaHideApp={false}
                    style={{
                        overlay: {
                            position: "fixed",
                            display: "flex",
                            justifyContent: "center",
                            top: "0",
                            left: "0",
                            width: "100%",
                            height: "100%",
                            backgroundColor: "rgba(0,0,0, .8)",
                            overflowY: "auto",
                            zIndex: 99,
                        },
                        content: {
                            top: '50%',
                            left: '50%',
                            right: 'auto',
                            bottom: 'auto',
                            marginRight: '-50%',
                            transform: 'translate(-50%, -50%)',
                            width: '95%',
                            maxWidth: '500px',
                            maxHeight: '600px',
                            borderRadius: '20px',
                            backgroundColor: '#fff',
                            zIndex: 9999
                        },
                    }}
                >
                    <Element.ModalBody>
                        <Element.ModalHeader>
                            <Element.ModalCloseIcon size={32} onClick={() => closeVoteModal()} />
                        </Element.ModalHeader>
                        <Element.ModalTitle>Your Vote</Element.ModalTitle>
                        <Element.ModalRow>
                            <Element.ModalLabel>Option</Element.ModalLabel>
                            <Element.ModalValue>{choice}</Element.ModalValue>
                        </Element.ModalRow>
                        <Element.ModalRow>
                            <Element.ModalLabel>Your voting power</Element.ModalLabel>
                            <Element.ModalValue>{formatNum(balance)} {tokenSymbol}</Element.ModalValue>
                        </Element.ModalRow>
                        <Element.ModalTextArea
                            type={"text"}
                            value={message}
                            placeholder={'Share your reason (optional)'}
                            onChange={event => setMessage(event.target.value)} />

                        <Element.ModalAction>
                            <Element.ModalButton onClick={() => voteProposal()}>
                                {
                                    votingStatus ? <CircularProgress style={{ width: "16px", height: "16px", color: "white", }} /> : "Confirm"
                                }
                            </Element.ModalButton>
                        </Element.ModalAction>
                    </Element.ModalBody>
                </Modal>
            }
        </>

    );
}

export default ModalVote;