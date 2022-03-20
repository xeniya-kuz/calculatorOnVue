/* eslint-disable quote-props */
import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Calc from '@/components/Calc.vue'

const LocalVue = createLocalVue()
LocalVue.use(Vuex)

//test suit
describe('Calculator', () => {
  let wrapper

  const createComponent = () => {
    wrapper = mount(Calc)
  }
  // через текст селектора - норм
  const findButtonByText = (text) =>
    wrapper.findAll('button').wrappers.find(w => {
      return w.text() === text
    })
  const findLabelText = (text) => {
    return wrapper.findAll('label').wrappers.find(w => {
      return w.text() === text
    })
  }

  afterEach(() => {
    wrapper.destroy()
  })
  
  //test
  test('Ввод данных', () => {
    createComponent()
    // через name, но так лучше не делать
    const operand1 = wrapper.find('input[name=operand1]')
    operand1.setValue('10')
    // преобразование строки в число будет calcHandler, для удаления символа string1 должен быть строкой
    expect(wrapper.vm.string1).toBe('10')
  })
  
  it.each(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'])
  ('Проверка ввода числа %s с экранной клавиатуры',
    async (number) => {
    createComponent()

    await findLabelText('Операнд 2').trigger('click')
    await findButtonByText(number).trigger('click')
    expect(wrapper.vm.string2).toBe(number)
  })

  it('Удаление символа', async () => {
    createComponent()
    // через атрибут - норм
    const operand1 = wrapper.find('[data-test=operand1]')
    await operand1.setValue('10')
    await findLabelText('Операнд 1').trigger('click')
    await findButtonByText('←').trigger('click')
    expect(wrapper.vm.string1).toBe('1')
  })

  test('Клавиатура показана', async () => {
    createComponent()
   // await findLabelText('Экранная клавиатура').trigger('click')
    expect(wrapper.vm.checked).toBe(true)
  })
  it('Клавиатура скрывается', async () => {
    createComponent()
    await findLabelText('Экранная клавиатура').trigger('click')
    expect(wrapper.vm.checked).toBe(false)
  })

  it.each`
  firstNumber | secondNumber | operator  | expectedResult
  ${'3'} | ${'2'} | ${'+'} | ${5}
  ${'7'} | ${'2'} | ${'-'} | ${5}
  ${'4'} | ${'2'} | ${'/'} | ${2}
  ${'8'} | ${'2'} | ${'*'} | ${16}
  ${'5'} | ${'2'} | ${'xⁿ'} | ${25}
  `('Проверка оператора "$operator" с числами $firstNumber и $secondNumber',
    async ({ firstNumber, secondNumber, operator, expectedResult }) => {
      createComponent()

      await findLabelText('Операнд 1').trigger('click')
      await findButtonByText(firstNumber).trigger('click')

      await findLabelText('Операнд 2').trigger('click')
      await findButtonByText(secondNumber).trigger('click')

      await findButtonByText(operator).trigger('click')
      expect(wrapper.vm.result).toBe(expectedResult)
    })
  })