---
layout: "single"
title: 'aiacademy: 專題: 精心的model !?'
permalink: 'aiacademy/week14-18/ai-porject-what-is-agent'
tags: aiacademy ai-project reinforcement-learning q-learning
---

> 給我一個讓我有會很有感覺的，精心設計model

助教這句話一出，我幾乎巧妙的二壘安打瞬間被中外野美技接殺．．．　:cry:

挫折是最好的退燒藥！

速度問了助教前幾屆的成果

拿到了一個關鍵字　`RL(Reinforcement Learning)` 

竟然明燈都開啟了！

事不宜遲～　gogo~

----------------------------------------------------------------------

## Agents

- [Waht is deep learning agents?](https://searchenterpriseai.techtarget.com/definition/deep-learning-agent){:target="_black"}


## Q-Learning

![q_learning](https://pythonprogramming.net/static/images/reinforcement-learning/new-q-value-formula.png)

- [Q_Learning Play list](https://www.youtube.com/playlist?list=PLQVvvaa0QuDezJFIOU5wDdfy4e9vdnx-7){:target="_back"}

#### part 1 

- 超讚！！！

<iframe src="https://www.youtube.com/embed/yMk_XtIEzH8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

~~~python
import gym
import numpy as np

env = gym.make('MountainCar-v0')
env.reset()

print(env.observation_space.high)
print(env.observation_space.low)
print(env.action_space.n)

DISCRETE_OS_SIZE = [20] * len(env.observation_space.high)
discrete_os_win_size = (env.observation_space.high - env.observation_space.low) / DISCRETE_OS_SIZE

print(discrete_os_win_size)

"""
Q Table
"""
q_table = np.random.uniform(low=-2, high=0, size=(DISCRETE_OS_SIZE + [env.action_space.n]))
print(q_table.shape)

# 所有變動的觀察數值
# random starting q value
print(q_table)



"""
看車車爬山
"""

done = False
while not done:
    # 0 push car left
    # 1 no push
    # 2 push car right
    action = 2
    new_state, reward, done, _ = env.step(action)
    print(new_state, reward)
    env.render()

env.close()
~~~


#### Part 2 


<iframe src="https://www.youtube.com/embed/Gq1Azv_B4-4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

~~~python
import gym
import numpy as np

env = gym.make('MountainCar-v0')

LEARNING_RATE = 0.1
DISCOUNT = 0.95  # how much we value future reward
EPISODES = 25000

SHOW_EVERY = 2000

DISCRETE_OS_SIZE = [20] * len(env.observation_space.high)
discrete_os_win_size = (env.observation_space.high - env.observation_space.low) / DISCRETE_OS_SIZE

epsilon = 0.5  # 0~ 1 (higher: more random)
START_EPSILON_DECAYING = 1
END_EPSILON_DECAYING = EPISODES // 2
epsilon_decay_value = epsilon / (END_EPSILON_DECAYING - START_EPSILON_DECAYING)

"""
Q Table
"""
q_table = np.random.uniform(low=-2, high=0, size=(DISCRETE_OS_SIZE + [env.action_space.n]))


def get_discrete_state(state):
    discrete_state = (state - env.observation_space.low) / discrete_os_win_size
    return tuple(discrete_state.astype(np.int))


for episode in range(EPISODES):
    discrete_state_ = get_discrete_state(env.reset())
    done = False
    if episode % SHOW_EVERY == 0:
        print(episode)
        render = True
    else:
        render = False
    while not done:
        # 0 push car left
        # 1 no push
        # 2 push car right
        if np.random.random() > epsilon:
            # np.random.random(): (float) 0 ~ 1
            action = np.argmax(q_table[discrete_state_])
        else:
            action = np.random.randint(0, env.action_space.n)
        new_state, reward, done, _ = env.step(action)
        new_discrete_state = get_discrete_state(new_state)
        if render:
            env.render()
        if not done:
            max_future_q = np.max(q_table[new_discrete_state])
            current_q = q_table[discrete_state_ + (action, )]
            # q algorithm
            new_q = (1 - LEARNING_RATE) * current_q + LEARNING_RATE * (reward + DISCOUNT * max_future_q)
            q_table[discrete_state_ + (action,)] = new_q
        elif new_state[0] >= env.goal_position:
            print(f"we made it on episode {episode}")
            q_table[discrete_state_ + (action,)] = 0

        discrete_state = new_discrete_state

    if END_EPSILON_DECAYING >= episode >= START_EPSILON_DECAYING:
        episode -= epsilon_decay_value
env.close()
~~~


#### Part 3

- [part 3 page](https://pythonprogramming.net/q-learning-analysis-reinforcement-learning-python-tutorial/){:target="_back"}


<iframe src="https://www.youtube.com/embed/CBTbifYx6a8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

~~~python
import gym
import numpy as np
import matplotlib.pyplot as plt

env = gym.make('MountainCar-v0')

LEARNING_RATE = 0.1
DISCOUNT = 0.95  # how much we value future reward
EPISODES = 2000

SHOW_EVERY = 500

DISCRETE_OS_SIZE = [20] * len(env.observation_space.high)
discrete_os_win_size = (env.observation_space.high - env.observation_space.low) / DISCRETE_OS_SIZE

epsilon = 0.5  # 0~ 1 (higher: more random)
START_EPSILON_DECAYING = 1
END_EPSILON_DECAYING = EPISODES // 2
epsilon_decay_value = epsilon / (END_EPSILON_DECAYING - START_EPSILON_DECAYING)

"""
Q Table
"""
q_table = np.random.uniform(low=-2, high=0, size=(DISCRETE_OS_SIZE + [env.action_space.n]))

ep_rewards = []
aggr_ep_rewards = {'ep': [], 'avg': [], 'min': [], 'max': []}

def get_discrete_state(state):
    discrete_state = (state - env.observation_space.low) / discrete_os_win_size
    return tuple(discrete_state.astype(np.int))


for episode in range(EPISODES):
    episode_reward = 0
    discrete_state_ = get_discrete_state(env.reset())
    done = False
    if episode % SHOW_EVERY == 0:
        print(episode)
        render = True
    else:
        render = False
    while not done:
        # 0 push car left
        # 1 no push
        # 2 push car right
        if np.random.random() > epsilon:
            # np.random.random(): (float) 0 ~ 1
            action = np.argmax(q_table[discrete_state_])
        else:
            action = np.random.randint(0, env.action_space.n)

        new_state, reward, done, _ = env.step(action)
        episode_reward += reward
        new_discrete_state = get_discrete_state(new_state)
        if render:
            env.render()
        if not done:
            max_future_q = np.max(q_table[new_discrete_state])
            current_q = q_table[discrete_state_ + (action, )]
            # q algorithm
            new_q = (1 - LEARNING_RATE) * current_q + LEARNING_RATE * (reward + DISCOUNT * max_future_q)
            q_table[discrete_state_ + (action,)] = new_q
        elif new_state[0] >= env.goal_position:
            print(f"we made it on episode {episode}")
            q_table[discrete_state_ + (action,)] = 0

        discrete_state = new_discrete_state

    if END_EPSILON_DECAYING >= episode >= START_EPSILON_DECAYING:
        episode -= epsilon_decay_value

    ep_rewards.append(episode_reward)

    if not episode % SHOW_EVERY:
        average_reward = sum(ep_rewards[-SHOW_EVERY:])/SHOW_EVERY
        aggr_ep_rewards['ep'].append(episode)
        aggr_ep_rewards['avg'].append(average_reward)
        aggr_ep_rewards['min'].append(min(ep_rewards[-SHOW_EVERY:]))
        aggr_ep_rewards['max'].append(max(ep_rewards[-SHOW_EVERY:]))

        print(f"Episode: {episode}, avg: {average_reward},"
              f"min: {min(ep_rewards[-SHOW_EVERY:])} max: {max(ep_rewards[-SHOW_EVERY:])}")

env.close()
plt.plot(aggr_ep_rewards['ep'],  aggr_ep_rewards['avg'], label='avg')
plt.plot(aggr_ep_rewards['ep'],  aggr_ep_rewards['min'], label='min')
plt.plot(aggr_ep_rewards['ep'],  aggr_ep_rewards['max'], label='max')
plt.legend(loc=4)
plt.show()
~~~