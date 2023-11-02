<template>
  <div class="G_Keyboard">
    <section class="keyboard-top">
      <div class="remark">
        <el-icon>
          <CollectionTag />
        </el-icon>
        <el-input
          v-model="tallyItem.remark"
          placeholder="点击写备注..."
        >
          <template #prepend>备注:</template>
        </el-input>
      </div>
      <div class="amount">{{ tallyItem.amount || '0.00' }}</div>
    </section>
    <section class="keyboard-body">
      <ul class="row" v-for="(item, index) in keyMap" :key="index">
        <li class="key" v-for="keyboard in item" :key="keyboard.key" @click="() => handleKeyCheck(keyboard.key)">
          <el-icon v-if="keyboard.component">
            <span v-if="keyboard.key === 'calendar'">
              <span v-if="tallyItem.date" style="font-size: 12px;">{{ tallyItem.date }}</span>
              <span v-else style="vertical-align: middle;">
                <component :is="keyboard.component"/>
                今天
              </span>
            </span>
            <component v-else :is="keyboard.component"/>
          </el-icon>
          <span v-else-if="keyboard.text" style="background-color: #FFD946;">
            {{ isCalculate ? '=' : keyboard.text }}
          </span>
          <span v-else>
            {{ keyboard.key }}
          </span>
        </li>
      </ul>
    </section>
    <el-dialog
      title="请选择日期"
      height="420px"
      width="420px"
      v-model="showDatePicker"
    >
      <section class="date-content">
        <el-date-picker
          type="date"
          v-model="tallyItem.date"
          value-format="YYYY/MM/DD"
          placeholder="Pick a day"
        />
      </section>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { CollectionTag, Back, Calendar } from '@element-plus/icons-vue'
import { KeyItem, SingleKey } from './type'

const $emit = defineEmits<{
  (e: 'done', value: {
    remark: string,
    amount: string,
    date: string
  }): void
}>()

const keyMap = <Array<KeyItem[]>>([
  [{key: '7'}, {key: '8'}, {key: '9'}, {key: 'calendar', component: Calendar}],
  [{key: '4'}, {key: '5'}, {key: '6'}, {key: '+'}],
  [{key: '1'}, {key: '2'}, {key: '3'}, {key: '-'}],
  [{key: '.'}, {key: '0'}, {key: 'back', component: Back}, {key: 'done', text: '完成'}]
])

const tallyItem = reactive({
  amount: '',
  remark: '',
  date: ''
})
const isCalculate = ref(false)

const handleCalculateAmount = () => {
  try {
    tallyItem.amount = String(eval(tallyItem.amount))
  } catch (e) {
    console.log(e)
  }
}

const handleRecordNumber = (value: string) => {
  // if (!tallyItem.amount) {
  //   tallyItem.amount += value
  //   return
  // }
  // if (tallyItem.amount.includes('+')) {
  //   const [left, right] = tallyItem.amount.split('+')
    
  // } else if (tallyItem.amount.includes('-')) {
  //   const index = tallyItem.amount.split('').findLastIndex(code => code === '-')
  //   if (index === 0) {
  //     if (tallyItem.amount === '-' && value === '.') {
  //       return
  //     }
      
  //   } else {

  //   }
    
  //   tallyItem.amount += value
  // } else {
  //   if (!tallyItem.amount.includes('.') && value === '.') {
  //     tallyItem.amount += value
  //     return
  //   } else if (tallyItem.amount.includes('.') && value === '.') {
  //     return
  //   }
  //   const [first, last] = tallyItem.amount.split('.')
  //   if (first && !last) {
  //     if (first.length < 7) {
  //       tallyItem.amount += value
  //       return
  //     }
  //     if (first.length === 7 && tallyItem.amount.endsWith('.')) {
  //       tallyItem.amount += value
  //       return
  //     }
  //   } else if ((!first && last) || (first && last) || (!first && !last)) {
  //     if (last.length < 2) {
  //       tallyItem.amount += value
  //       return
  //     }
  //   }
  // }
}

const handleRecordSymbol = (symbol: '+' | '-') => {
  // 没有数值时只能插入减号
  if (!tallyItem.amount && symbol === '+') return

  // 当只有一个减号时不允许在添加符号
  if (tallyItem.amount === '-') return

  // 结尾符号的替换
  if (symbol === '+') {
    if (tallyItem.amount.endsWith('-')) {
      tallyItem.amount = tallyItem.amount.slice(0, -1) + '+'
      return
    }
  } else if (tallyItem.amount.endsWith('+')) {
    tallyItem.amount = tallyItem.amount.slice(0, -1) + '-'
    return
  }

  // 只允许同时存在一个加号或者两个减号
  if (tallyItem.amount.includes('+')) return
  if (tallyItem.amount.startsWith('-')) {
    let count = 0
    tallyItem.amount.split('').forEach((item) => {
      if (item === '-') count++
    })
    if (count >= 2) {
      tallyItem.amount = tallyItem.amount.slice(0, -1) + '+'
      return
    }
  } else {
    let count = 0
    tallyItem.amount.split('').forEach((item) => {
      if (item === '-') count++
    })
    if (count >= 1) {
      tallyItem.amount = tallyItem.amount.slice(0, -1) + '+'
      return
    }
  }
  tallyItem.amount += symbol
}

const handleBack = () => {
  tallyItem.amount = tallyItem.amount.slice(0, -1)
}

const showDatePicker = ref(false)
const handleCalender = () => {
  showDatePicker.value = true
}

const handleDone = () => {
  if (isCalculate.value) {
    handleCalculateAmount()
    isCalculate.value = false
  } else if (tallyItem.amount.endsWith('+') || tallyItem.amount.endsWith('-')) {
    tallyItem.amount = tallyItem.amount.slice(0, -1)
  } else {
    $emit('done', tallyItem)
  }
}

const handleKeyCheck = (key: SingleKey) => {
  switch (key) {
    case '0':
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
    case '.':
      handleRecordNumber(key)
      break
    case '+':
    case '-':
      handleRecordSymbol(key)
      break;
    case 'done':
      handleDone()
    break
    case 'back':
      handleBack()
    break
    case 'calendar':
      handleCalender()
    break
    default:
      break;
  }
}
</script>

<style scoped lang="scss">
.G_Keyboard {
  position: relative;
  width: 100%;
  min-width: 320px;
  padding: 8px 10%;

  .keyboard-top {
    height: 32px;
    display: flex;
    align-items: center;
    margin: 0 8px;
    border-bottom: 2px solid #cccccc;

    .remark {
      display: flex;
      flex: 1;
      align-items: center;
      padding: 0 5px;

      .el-icon {
        position: relative;
        font-size: 14px;

        &::before {
          content: '';
          position: absolute;
          top: 1.8px;
          left: 3.6px;
          right: 3.6px;
          height: 4px;
          background-color: #FFD946;
        }
      }

      .el-input {
        height: 24px;

        :deep(.el-input-group__prepend) {
          padding: 0px 3px;
          color: #000;
          font-size: 14px;
          background-color: unset;
          box-shadow: unset;
        }
        :deep(.el-input__wrapper) {
          border: unset;
          box-shadow: unset;

          .el-input__inner {
            font-size: 12px;
          }
        }
      }
    }

    .amount {
      font-size: 14px;
    }
  }

  .keyboard-body {
    display: flex;
    flex-direction: column;
    margin-top: 8px;

    .row {
      flex: 1;
      display: flex;
      align-items: center;

      .key {
        flex: 1;
        height: 36px;
        line-height: 36px;
        text-align: center;
        border: 1px solid #cccccc;
        border-radius: 5px;
        margin: 5px 4px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        user-select: none;

        &:active {
          box-shadow: inset 0px 0px 10px rgba(0, 0, 0, .1);
        }

        & > * {
          display: inline-block;
          width: 100%;
          height: 100%;
          border-radius: 4px;
        }
      }
    }
  }

  .date-content {
    height: 400px;
    display: flex;
    justify-content: center;
  }
}
</style>