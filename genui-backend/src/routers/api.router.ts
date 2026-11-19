import chat from '#src/services/AiChatService.ts';
import { Router } from 'express';

// ========================================================================= //
//                                   EXEC                                    //
// ========================================================================= //

const router = Router();

// Add routers as the app grows, e.g.:
// apiRouter.use(Paths.Chat.PATH, chatRouter);

router.post('/chat', async (req, res) => {
    const messages = req.body;
    const chatResponse = await chat(messages);
    if (chatResponse !== null) {
        res.status(200).json({ ui: chatResponse });
    } else {
        res.status(500).json({ error: 'Chat failed' });
    }
})

// ========================================================================= //
//                                  EXPORT                                   //
// ========================================================================= //

export default router;
